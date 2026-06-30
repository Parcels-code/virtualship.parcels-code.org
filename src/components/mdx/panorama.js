import { Box, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { Image } from '@/components/mdx/image'

const DEFAULT_HINT = 'Drag to look around. On mobile, drag or move your device.'
const FALLBACK_MAX_TEXTURE_SIZE = 2048
const VIDEO_PANORAMA_TIMEOUT_MS = 5000
const DEFAULT_VIDEO_INITIAL_YAW_OFFSET_DEG = 0
const isVideoPanoramaSource = (source) =>
  /\.(mov|mp4|webm|ogg)$/i.test(source?.split('?')[0] || '')
const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const waitForVideoReady = (videoElement, timeoutMs) =>
  new Promise((resolve, reject) => {
    let settled = false

    const finish = (callback) => {
      if (settled) return
      settled = true
      clearTimeout(timeoutId)
      videoElement.removeEventListener('loadeddata', onReady)
      videoElement.removeEventListener('canplay', onReady)
      videoElement.removeEventListener('error', onError)
      callback()
    }

    const onReady = () => finish(resolve)
    const onError = () => finish(() => reject(new Error('Video load failed')))
    const timeoutId = setTimeout(
      () => finish(() => reject(new Error('Video load timed out'))),
      timeoutMs,
    )

    videoElement.addEventListener('loadeddata', onReady)
    videoElement.addEventListener('canplay', onReady)
    videoElement.addEventListener('error', onError)
    videoElement.load()
  })

const getViewerFactory = (pannellumModule) => {
  if (typeof window !== 'undefined' && window.pannellum) {
    if (typeof window.pannellum.viewer === 'function') {
      return window.pannellum.viewer
    }
  }

  if (pannellumModule && typeof pannellumModule.viewer === 'function') {
    return pannellumModule.viewer
  }

  if (
    pannellumModule &&
    pannellumModule.default &&
    typeof pannellumModule.default.viewer === 'function'
  ) {
    return pannellumModule.default.viewer
  }

  if (typeof pannellumModule === 'function') {
    return pannellumModule
  }

  if (pannellumModule && typeof pannellumModule.default === 'function') {
    return pannellumModule.default
  }

  return null
}

const getMaxPanoramaWidth = () => {
  if (typeof document === 'undefined') return FALLBACK_MAX_TEXTURE_SIZE * 2

  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

    if (!gl) return FALLBACK_MAX_TEXTURE_SIZE * 2
    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
    return Math.max(FALLBACK_MAX_TEXTURE_SIZE * 2, maxTextureSize * 2)
  } catch {
    return FALLBACK_MAX_TEXTURE_SIZE * 2
  }
}

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Panorama image failed to load'))
    img.src = src
  })

const buildResizedPanorama = async (src, maxWidth) => {
  const image = await loadImage(src)
  if (image.naturalWidth <= maxWidth) return src

  const scale = maxWidth / image.naturalWidth
  const targetWidth = Math.round(image.naturalWidth * scale)
  const targetHeight = Math.round(image.naturalHeight * scale)

  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight

  const ctx = canvas.getContext('2d')
  if (!ctx) return src

  ctx.drawImage(image, 0, 0, targetWidth, targetHeight)
  return canvas.toDataURL('image/jpeg', 0.9)
}

export const Panorama = ({
  src,
  alt,
  height = '420px',
  hint = DEFAULT_HINT,
  initialYawOffsetDeg = DEFAULT_VIDEO_INITIAL_YAW_OFFSET_DEG,
  ...imageProps
}) => {
  const containerRef = useRef(null)
  const viewerRef = useRef(null)
  const videoElementRef = useRef(null)
  const animationFrameRef = useRef(null)
  const [viewerFailed, setViewerFailed] = useState(false)
  const [viewerLoaded, setViewerLoaded] = useState(false)
  const isVideoSource = isVideoPanoramaSource(src)

  useEffect(() => {
    let cancelled = false

    setViewerFailed(false)
    setViewerLoaded(false)
    videoElementRef.current = null

    const setupThreeVideoViewer = async () => {
      if (!containerRef.current || !src || typeof window === 'undefined') {
        return
      }

      try {
        const THREE = await import('three')
        if (cancelled || !containerRef.current) return

        const videoElement = document.createElement('video')
        videoElement.src = src
        videoElement.crossOrigin = 'anonymous'
        videoElement.setAttribute('playsinline', '')
        videoElement.setAttribute('webkit-playsinline', '')
        videoElement.playsInline = true
        videoElement.loop = true
        videoElement.muted = false
        videoElement.defaultMuted = false
        videoElement.volume = 1
        videoElement.preload = 'auto'
        videoElementRef.current = videoElement

        try {
          await waitForVideoReady(videoElement, VIDEO_PANORAMA_TIMEOUT_MS)
        } catch {
          if (!cancelled) setViewerFailed(true)
          return
        }

        if (cancelled || !containerRef.current) return

        const container = containerRef.current
        const width = Math.max(container.clientWidth, 1)
        const heightPx = Math.max(container.clientHeight, 1)

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
          75,
          width / heightPx,
          1,
          1100,
        )
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setPixelRatio(window.devicePixelRatio || 1)
        renderer.setSize(width, heightPx)
        container.appendChild(renderer.domElement)

        const texture = new THREE.VideoTexture(videoElement)
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        texture.generateMipmaps = false

        const geometry = new THREE.SphereGeometry(500, 64, 40)
        geometry.scale(-1, 1, 1)

        const material = new THREE.MeshBasicMaterial({ map: texture })
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        let lon = 0
        let lat = 0
        let isPointerDown = false
        let pointerDownX = 0
        let pointerDownY = 0
        let lonOnPointerDown = 0
        let latOnPointerDown = 0
        const target = new THREE.Vector3()

        const handlePointerDown = (event) => {
          isPointerDown = true
          pointerDownX = event.clientX
          pointerDownY = event.clientY
          lonOnPointerDown = lon
          latOnPointerDown = lat
        }

        const handlePointerMove = (event) => {
          if (!isPointerDown) return
          lon = (pointerDownX - event.clientX) * 0.1 + lonOnPointerDown
          lat = (event.clientY - pointerDownY) * 0.1 + latOnPointerDown
        }

        const handlePointerUp = () => {
          isPointerDown = false
        }

        const handleWheel = (event) => {
          camera.fov = clamp(camera.fov + event.deltaY * 0.05, 30, 100)
          camera.updateProjectionMatrix()
        }

        const handleResize = () => {
          if (!containerRef.current) return
          const nextWidth = Math.max(containerRef.current.clientWidth, 1)
          const nextHeight = Math.max(containerRef.current.clientHeight, 1)
          camera.aspect = nextWidth / nextHeight
          camera.updateProjectionMatrix()
          renderer.setSize(nextWidth, nextHeight)
        }

        container.addEventListener('pointerdown', handlePointerDown)
        window.addEventListener('pointermove', handlePointerMove)
        window.addEventListener('pointerup', handlePointerUp)
        container.addEventListener('wheel', handleWheel, { passive: true })
        window.addEventListener('resize', handleResize)

        const animate = () => {
          if (cancelled) return
          lat = clamp(lat, -85, 85)
          const phi = THREE.MathUtils.degToRad(90 - lat)
          const theta = THREE.MathUtils.degToRad(lon + initialYawOffsetDeg)

          target.set(
            500 * Math.sin(phi) * Math.cos(theta),
            500 * Math.cos(phi),
            500 * Math.sin(phi) * Math.sin(theta),
          )

          camera.lookAt(target)
          renderer.render(scene, camera)
          animationFrameRef.current = window.requestAnimationFrame(animate)
        }

        setViewerLoaded(true)
        animationFrameRef.current = window.requestAnimationFrame(animate)

        try {
          await videoElement.play()
        } catch {
          if (!cancelled) {
            setViewerFailed(true)
          }
        }

        if (cancelled) return

        return () => {
          container.removeEventListener('pointerdown', handlePointerDown)
          window.removeEventListener('pointermove', handlePointerMove)
          window.removeEventListener('pointerup', handlePointerUp)
          container.removeEventListener('wheel', handleWheel)
          window.removeEventListener('resize', handleResize)
          if (animationFrameRef.current) {
            window.cancelAnimationFrame(animationFrameRef.current)
            animationFrameRef.current = null
          }
          geometry.dispose()
          material.dispose()
          texture.dispose()
          renderer.dispose()
          if (renderer.domElement.parentNode === container) {
            container.removeChild(renderer.domElement)
          }
        }
      } catch {
        if (!cancelled) setViewerFailed(true)
      }
    }

    const initViewer = (viewerFactory, panoramaSource) => {
      viewerRef.current = viewerFactory(containerRef.current, {
        type: 'equirectangular',
        panorama: panoramaSource,
        autoLoad: true,
        showControls: true,
        showFullscreenCtrl: true,
        mouseZoom: true,
        compass: false,
        hfov: 110,
      })

      if (typeof viewerRef.current.on === 'function') {
        viewerRef.current.on('load', () => {
          if (!cancelled) setViewerLoaded(true)
        })

        viewerRef.current.on('error', () => {
          if (cancelled) return
          setViewerFailed(true)
        })
      }
    }

    const setupViewer = async () => {
      if (!containerRef.current || !src || typeof window === 'undefined') {
        return
      }

      if (isVideoSource) {
        const cleanupThreeVideoViewer = await setupThreeVideoViewer()
        if (typeof cleanupThreeVideoViewer === 'function') {
          return cleanupThreeVideoViewer
        }
        return
      }

      try {
        const pannellumModule = await import('pannellum')
        if (cancelled) return

        const viewerFactory = getViewerFactory(pannellumModule)
        if (!viewerFactory) {
          throw new Error('Unable to resolve Pannellum viewer factory')
        }

        const maxPanoramaWidth = getMaxPanoramaWidth()

        try {
          const safeSource = await buildResizedPanorama(src, maxPanoramaWidth)
          if (cancelled) return
          try {
            initViewer(viewerFactory, safeSource)
          } catch {
            if (cancelled) return
            initViewer(viewerFactory, src)
          }
        } catch {
          if (cancelled) return
          try {
            initViewer(viewerFactory, src)
          } catch {
            setViewerFailed(true)
          }
        }
      } catch {
        if (!cancelled) {
          setViewerFailed(true)
        }
      }
    }

    let cleanupView = null

    const runSetup = async () => {
      cleanupView = await setupViewer()
    }

    runSetup()

    return () => {
      cancelled = true
      if (typeof cleanupView === 'function') {
        cleanupView()
      }
      if (
        viewerRef.current &&
        typeof viewerRef.current.destroy === 'function'
      ) {
        viewerRef.current.destroy()
      }
      if (videoElementRef.current) {
        videoElementRef.current.pause()
        videoElementRef.current.removeAttribute('src')
        videoElementRef.current.load()
      }
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      videoElementRef.current = null
      viewerRef.current = null
    }
  }, [src, isVideoSource, initialYawOffsetDeg])

  return (
    <Box my={6} position='relative'>
      {!viewerFailed && (
        <Box
          ref={containerRef}
          role='img'
          aria-label={alt}
          borderRadius='md'
          overflow='hidden'
          height={height}
          width='100%'
          cursor='grab'
          userSelect='none'
          style={{ WebkitUserSelect: 'none', touchAction: 'none' }}
        />
      )}

      {viewerFailed &&
        (isVideoPanoramaSource(src) ? (
          <Box
            as='video'
            src={src}
            controls
            autoPlay
            width='100%'
            borderRadius='md'
            maxH={height}
            bg='black'
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            borderRadius='md'
            width='100%'
            {...imageProps}
          />
        ))}

      <Text mt={2} fontSize='sm' color='gray.500'>
        {viewerLoaded || viewerFailed ? hint : 'Loading 360 view...'}
      </Text>

      <Text
        position='absolute'
        top={2}
        right={2}
        aria-label='360 degree panorama'
        bg='blackAlpha.800'
        color='white'
        fontSize='xs'
        fontWeight='bold'
        px={2}
        py={1}
        borderRadius='md'
        pointerEvents='none'
      >
        360°
      </Text>
    </Box>
  )
}
