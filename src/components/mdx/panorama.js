import { Box, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { Image } from '@/components/mdx/image'

const DEFAULT_HINT = 'Drag to look around. On mobile, drag or move your device.'
const FALLBACK_MAX_TEXTURE_SIZE = 2048

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
  ...imageProps
}) => {
  const containerRef = useRef(null)
  const viewerRef = useRef(null)
  const [viewerFailed, setViewerFailed] = useState(false)
  const [viewerLoaded, setViewerLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    setViewerFailed(false)
    setViewerLoaded(false)

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

        viewerRef.current.on('error', (error) => {
          if (cancelled) return
          setViewerFailed(true)
        })
      }
    }

    const setupViewer = async () => {
      if (!containerRef.current || !src || typeof window === 'undefined') {
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

    setupViewer()

    return () => {
      cancelled = true
      if (
        viewerRef.current &&
        typeof viewerRef.current.destroy === 'function'
      ) {
        viewerRef.current.destroy()
      }
      viewerRef.current = null
    }
  }, [src])

  return (
    <Box my={6}>
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
          touchAction='none'
          userSelect='none'
          style={{ WebkitUserSelect: 'none' }}
        />
      )}

      {viewerFailed && (
        <Image
          src={src}
          alt={alt}
          borderRadius='md'
          width='100%'
          {...imageProps}
        />
      )}

      <Text mt={2} fontSize='sm' color='gray.500'>
        {viewerLoaded || viewerFailed ? hint : 'Loading 360 view...'}
      </Text>
    </Box>
  )
}
