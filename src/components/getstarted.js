import {
  Box,
  Button,
  Container,
  Image,
  Text,
  Link,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { GetStarted as data } from '@/data/getstarted'

import { Heading } from '@/components/mdx'
import { Panorama } from '@/components/mdx/panorama'

export const GetStarted = () => {
  const getstarted = React.useMemo(() => data, [])
  const [activeIndex, setActiveIndex] = React.useState(null)
  const [previewImageSrc, setPreviewImageSrc] = React.useState(
    '/getstarted/researcher/running.png',
  )
  const [previewImageAlt, setPreviewImageAlt] = React.useState('Image preview')
  const [previewImageType, setPreviewImageType] = React.useState('image')
  const [previewInitialYawOffsetDeg, setPreviewInitialYawOffsetDeg] =
    React.useState(undefined)
  const {
    isOpen: isImagePreviewOpen,
    onOpen: openImagePreview,
    onClose: closeImagePreview,
  } = useDisclosure()
  const tabSlugs = React.useMemo(
    () =>
      getstarted.map((item) =>
        item.name
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, ''),
      ),
    [getstarted],
  )

  React.useEffect(() => {
    const getTabIndexFromHash = () => {
      const hash = window.location.hash.replace(/^#/, '').toLowerCase()

      if (!hash) {
        return null
      }

      const normalized = hash.startsWith('getstarted-')
        ? hash.slice('getstarted-'.length)
        : hash

      const index = tabSlugs.indexOf(normalized)
      return index >= 0 ? index : null
    }

    const syncActiveTabFromHash = () => {
      const indexFromHash = getTabIndexFromHash()
      if (indexFromHash !== null) {
        setActiveIndex(indexFromHash)
      }
    }

    syncActiveTabFromHash()
    window.addEventListener('hashchange', syncActiveTabFromHash)

    return () => {
      window.removeEventListener('hashchange', syncActiveTabFromHash)
    }
  }, [tabSlugs])

  const handleTabClick = (index) => {
    const nextIndex = activeIndex === index ? null : index
    setActiveIndex(nextIndex)

    if (typeof window !== 'undefined') {
      const nextHash =
        nextIndex === null ? 'getstarted' : `getstarted-${tabSlugs[nextIndex]}`
      window.history.pushState(null, '', `#${nextHash}`)
    }
  }

  const renderTextWithLinks = (text) => {
    const linkRegex = /\[([^\]]+)\]\(((?:https?:\/\/|\/)[^)\s]+)\)/g
    const nodes = []
    let lastIndex = 0
    let match

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        nodes.push(text.slice(lastIndex, match.index))
      }

      const linkLabel = match[1]
      const href = match[2]
      const isExternalLink = /^https?:\/\//i.test(href)

      nodes.push(
        <Link
          key={`${href}-${match.index}`}
          href={href}
          color='blue.700'
          isExternal={isExternalLink}
          textDecoration='underline'
          onClick={
            isExternalLink
              ? undefined
              : (event) => {
                  event.preventDefault()
                  handleImageClick(
                    href,
                    linkLabel,
                    isHtmlFigure(href) ? 'html' : 'image',
                  )
                }
          }
        >
          {linkLabel}
        </Link>,
      )

      lastIndex = linkRegex.lastIndex
    }

    if (lastIndex < text.length) {
      nodes.push(text.slice(lastIndex))
    }

    return nodes
  }

  const isHtmlFigure = (src) => src?.toLowerCase().endsWith('.html')
  const isPdfFigure = (src) => src?.toLowerCase().endsWith('.pdf')
  const isVideoFigure = (src) =>
    /\.(mov|mp4|webm|ogg)$/i.test(src?.split('?')[0] || '')

  const activeItem = activeIndex !== null ? getstarted[activeIndex] : null
  const hasActiveItemImages =
    activeItem &&
    Array.isArray(activeItem.images) &&
    activeItem.images.length > 0
  const activeItemImages = hasActiveItemImages ? activeItem.images : []
  const sidebarImages = activeItemImages.filter((image) => {
    if (image.inlineBelowText) {
      return false
    }

    const modalSrc = image.modalSrc || image.src
    const modalType =
      image.modalType ||
      (isHtmlFigure(modalSrc)
        ? 'html'
        : isVideoFigure(modalSrc)
          ? 'video'
          : 'image')

    return modalType !== 'video'
  })
  const inlineVideoImages = activeItemImages.filter((image) => {
    const modalSrc = image.modalSrc || image.src
    const modalType =
      image.modalType ||
      (isHtmlFigure(modalSrc)
        ? 'html'
        : isVideoFigure(modalSrc)
          ? 'video'
          : 'image')

    return modalType === 'video'
  })
  const inlineBelowTextImages = activeItemImages.filter(
    (image) => image.inlineBelowText,
  )

  const handleImageClick = (
    src,
    alt,
    type = 'image',
    initialYawOffsetDeg = undefined,
  ) => {
    setPreviewImageSrc(src)
    setPreviewImageAlt(alt || 'Image preview')
    setPreviewImageType(type)
    setPreviewInitialYawOffsetDeg(initialYawOffsetDeg)
    openImagePreview()
  }

  return (
    <Box id={'getstarted'} as='section' bg='#AEB8FE' mb={0} pt={6} pb={12}>
      <Container maxW='container.lg' centerContent>
        <Heading as='h1' size='2xl' mt={6} mb={1}>
          Get started as
        </Heading>
        <Text mt={0} mb={6} fontSize='sm' color='gray.800' textAlign='center'>
          [click buttons below to expand sections]
        </Text>

        <Box my={0} width='100%'>
          <Grid
            templateColumns={`repeat(${getstarted.length}, 1fr)`}
            gap={6}
            my={0}
            width='100%'
          >
            {getstarted.map((item, index) => (
              <Button
                key={index}
                bg={activeIndex === index ? '#FFCD00' : '#27187E'}
                color={activeIndex === index ? 'black' : 'white'}
                _hover={{ bg: activeIndex === index ? '#E6B800' : '#21156D' }}
                _active={{ bg: activeIndex === index ? '#CC9F00' : '#1C135B' }}
                borderRadius='md'
                width='100%'
                height='64px'
                fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
                fontWeight='bold'
                onClick={() => handleTabClick(index)}
                aria-pressed={activeIndex === index}
                transition='background-color 0.2s ease'
                display='flex'
                alignItems='center'
                justifyContent='center'
              >
                {item.name}
              </Button>
            ))}
          </Grid>
          {activeIndex !== null && (
            <Box mt={4} width='100%'>
              {hasActiveItemImages ? (
                <Grid
                  templateColumns={{ base: '1fr', md: '2fr 1fr' }}
                  gap={6}
                  alignItems='start'
                >
                  <Box>
                    <Text fontSize={'lg'} whiteSpace='pre-line'>
                      {renderTextWithLinks(getstarted[activeIndex].text)}
                    </Text>
                    {inlineBelowTextImages.length > 0 && (
                      <>
                        <Grid
                          templateColumns={{ base: '1fr', md: '1fr 1fr' }}
                          gap={4}
                          mt={4}
                        >
                          {inlineBelowTextImages.map((image, index) => {
                            const inlineSrc = image.src
                            const modalSrc = image.modalSrc || image.src
                            const modalType = image.modalType || 'html'
                            const altText =
                              image.alt ||
                              `${activeItem.name} document ${index + 1}`

                            return (
                              <Box
                                key={`${inlineSrc}-${index}`}
                                position='relative'
                                width='100%'
                              >
                                <Image
                                  src={inlineSrc}
                                  alt={altText}
                                  width='100%'
                                  borderRadius='md'
                                  cursor='pointer'
                                  onClick={() =>
                                    handleImageClick(
                                      modalSrc,
                                      altText,
                                      modalType,
                                      image.initialYawOffsetDeg,
                                    )
                                  }
                                />
                              </Box>
                            )
                          })}
                        </Grid>
                        <Text mt={2} fontSize='sm' color='gray.700'>
                          [click thumbnails above to open full assignment PDFs]
                        </Text>
                      </>
                    )}
                    {inlineVideoImages.map((image, index) => {
                      const inlineSrc = image.src
                      const modalSrc = image.modalSrc || image.src
                      const modalType = image.modalType || 'video'
                      const altText =
                        image.alt || `${activeItem.name} video ${index + 1}`

                      return (
                        <Box
                          key={`${inlineSrc}-${index}`}
                          position='relative'
                          width='100%'
                          mt={4}
                        >
                          <Image
                            src={inlineSrc}
                            alt={altText}
                            width='100%'
                            borderRadius='md'
                            cursor='pointer'
                            onClick={() =>
                              handleImageClick(
                                modalSrc,
                                altText,
                                modalType,
                                image.initialYawOffsetDeg,
                              )
                            }
                          />
                          <Box
                            position='absolute'
                            top='50%'
                            left='50%'
                            transform='translate(-50%, -50%)'
                            bg='blackAlpha.700'
                            color='white'
                            borderRadius='full'
                            px={6}
                            py={3}
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            gap={3}
                            fontSize={{ base: 'sm', md: 'md' }}
                            fontWeight='semibold'
                            lineHeight='1'
                            pointerEvents='none'
                            aria-label='play 360° video'
                          >
                            <Box as='span' aria-hidden='true'>
                              ▶
                            </Box>
                            <Box as='span'>Play 360° video</Box>
                          </Box>
                        </Box>
                      )
                    })}
                  </Box>
                  <Box justifySelf={{ base: 'center', md: 'end' }}>
                    {sidebarImages.map((image, index) => {
                      const inlineSrc = image.src
                      const modalSrc = image.modalSrc || image.src
                      const modalType =
                        image.modalType ||
                        (isHtmlFigure(modalSrc)
                          ? 'html'
                          : isVideoFigure(modalSrc)
                            ? 'video'
                            : 'image')
                      const altText =
                        image.alt || `${activeItem.name} image ${index + 1}`

                      if (isHtmlFigure(inlineSrc)) {
                        return (
                          <Box
                            key={`${inlineSrc}-${index}`}
                            mt={index === 0 ? 0 : 4}
                          >
                            <Box
                              as='iframe'
                              src={inlineSrc}
                              title={altText}
                              width='100%'
                              maxW='360px'
                              height='260px'
                              border='1px solid'
                              borderColor='gray.200'
                              borderRadius='md'
                              bg='white'
                            />
                            <Button
                              mt={2}
                              size='sm'
                              width='100%'
                              maxW='360px'
                              onClick={() =>
                                handleImageClick(modalSrc, altText, modalType)
                              }
                            >
                              Open larger view
                            </Button>
                          </Box>
                        )
                      }

                      return (
                        <Box
                          key={`${inlineSrc}-${index}`}
                          position='relative'
                          width='100%'
                          maxW='360px'
                          mt={index === 0 ? 0 : 4}
                        >
                          <Image
                            src={inlineSrc}
                            alt={altText}
                            width='100%'
                            maxW='360px'
                            borderRadius='md'
                            cursor='pointer'
                            onClick={() =>
                              handleImageClick(
                                modalSrc,
                                altText,
                                modalType,
                                image.initialYawOffsetDeg,
                              )
                            }
                          />
                          {modalType === 'panorama' && (
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
                          )}
                          {modalType === 'video' && (
                            <Box
                              position='absolute'
                              top='50%'
                              left='50%'
                              transform='translate(-50%, -50%)'
                              bg='blackAlpha.700'
                              color='white'
                              borderRadius='full'
                              px={4}
                              py={2}
                              display='flex'
                              alignItems='center'
                              justifyContent='center'
                              gap={2}
                              fontSize='sm'
                              fontWeight='semibold'
                              lineHeight='1'
                              pointerEvents='none'
                              aria-label='play 360 degree video'
                            >
                              <Box as='span' aria-hidden='true'>
                                ▶
                              </Box>
                              <Box as='span'>Play 360degree video</Box>
                            </Box>
                          )}
                        </Box>
                      )
                    })}
                    {(sidebarImages.length > 0 ||
                      inlineVideoImages.length > 0) && (
                      <Text
                        mt={2}
                        fontSize='sm'
                        color='gray.800'
                        textAlign='center'
                      >
                        [click figures above to open a larger view]
                      </Text>
                    )}
                  </Box>
                </Grid>
              ) : (
                <Text fontSize={'lg'} whiteSpace='pre-line'>
                  {renderTextWithLinks(getstarted[activeIndex].text)}
                </Text>
              )}
            </Box>
          )}
        </Box>
      </Container>

      <Modal isOpen={isImagePreviewOpen} onClose={closeImagePreview} size='4xl'>
        <ModalOverlay bg='blackAlpha.700' />
        <ModalContent bg='white' boxShadow='lg'>
          {previewImageType !== 'video' && (
            <ModalCloseButton
              color='black'
              bg='white'
              _hover={{ bg: 'gray.100' }}
              zIndex={2}
            />
          )}
          <ModalBody p={0} display='flex' justifyContent='center'>
            {previewImageType === 'panorama' ? (
              <Box width='100%' bg='white' borderRadius='md' px={2}>
                <Panorama
                  src={previewImageSrc}
                  alt={previewImageAlt}
                  height='70vh'
                  hint='Drag to look around. On mobile, drag or move your device.'
                  initialYawOffsetDeg={previewInitialYawOffsetDeg}
                  onRequestClose={closeImagePreview}
                />
              </Box>
            ) : isHtmlFigure(previewImageSrc) ||
              isPdfFigure(previewImageSrc) ||
              previewImageType === 'html' ? (
              <Box
                width='100%'
                height='80vh'
                borderRadius='md'
                bg='white'
                overflow='auto'
              >
                <Box
                  as='iframe'
                  src={previewImageSrc}
                  title={previewImageAlt}
                  width='100%'
                  height='100%'
                  border='none'
                />
              </Box>
            ) : previewImageType === 'video' ? (
              <Box width='100%' bg='white' borderRadius='md' px={2}>
                <Panorama
                  src={previewImageSrc}
                  alt={previewImageAlt}
                  height='70vh'
                  hint='Drag to look around. On mobile, drag or move your device.'
                  initialYawOffsetDeg={previewInitialYawOffsetDeg}
                  onRequestClose={closeImagePreview}
                />
              </Box>
            ) : (
              <Image
                src={previewImageSrc}
                alt={previewImageAlt}
                maxH='85vh'
                width='auto'
                borderRadius='md'
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
