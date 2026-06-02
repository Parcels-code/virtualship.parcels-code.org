import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Container,
  Image,
  Text,
  Link,
  Grid,
  GridItem,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { ColorModeImage } from '@/components/ColorModeImage'
import React from 'react'
import { GetStarted as data } from '@/data/getstarted'

import { Heading } from '@/components/mdx'

export const GetStarted = () => {
  const getstarted = React.useMemo(() => data, [])
  const [activeIndex, setActiveIndex] = React.useState(null)
  const [previewImageSrc, setPreviewImageSrc] = React.useState(
    '/getstarted/researcher/running.png',
  )
  const [previewImageAlt, setPreviewImageAlt] = React.useState('Image preview')
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
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g
    const nodes = []
    let lastIndex = 0
    let match

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        nodes.push(text.slice(lastIndex, match.index))
      }

      nodes.push(
        <Link
          key={`${match[2]}-${match.index}`}
          href={match[2]}
          color='blue.500'
          isExternal
          textDecoration='underline'
        >
          {match[1]}
        </Link>,
      )

      lastIndex = linkRegex.lastIndex
    }

    if (lastIndex < text.length) {
      nodes.push(text.slice(lastIndex))
    }

    return nodes
  }

  const activeItem = activeIndex !== null ? getstarted[activeIndex] : null
  const hasActiveItemImages =
    activeItem &&
    Array.isArray(activeItem.images) &&
    activeItem.images.length > 0

  const handleImageClick = (src, alt) => {
    setPreviewImageSrc(src)
    setPreviewImageAlt(alt || 'Image preview')
    openImagePreview()
  }

  const isHtmlFigure = (src) => src?.toLowerCase().endsWith('.html')

  return (
    <Box
      id={'getstarted'}
      as='section'
      bg='#AEB8FE'
      _dark={{ bg: 'blue.900' }}
      mb={0}
      pt={6}
      pb={12}
    >
      <Container maxW='container.lg' centerContent>
        <Heading as='h1' size='2xl' mt={6}>
          Get started as
        </Heading>

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
                bg='#27187E'
                color='white'
                _hover={{ bg: '#27187E' }}
                borderRadius='md'
                width='100%'
                height='64px'
                fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
                fontWeight='bold'
                onClick={() => handleTabClick(index)}
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
                  <Text fontSize={'lg'} whiteSpace='pre-line'>
                    {renderTextWithLinks(getstarted[activeIndex].text)}
                  </Text>
                  <Box justifySelf={{ base: 'center', md: 'end' }}>
                    {activeItem.images.map((image, index) => {
                      const inlineSrc = image.src
                      const modalSrc = image.modalSrc || image.src
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
                                handleImageClick(modalSrc, altText)
                              }
                            >
                              Open larger view
                            </Button>
                          </Box>
                        )
                      }

                      return (
                        <Image
                          key={`${inlineSrc}-${index}`}
                          src={inlineSrc}
                          alt={altText}
                          width='100%'
                          maxW='360px'
                          borderRadius='md'
                          cursor='pointer'
                          mt={index === 0 ? 0 : 4}
                          onClick={() => handleImageClick(modalSrc, altText)}
                        />
                      )
                    })}
                    <Text
                      mt={2}
                      fontSize='sm'
                      color='gray.500'
                      textAlign='center'
                    >
                      Click figures to open a larger view.
                    </Text>
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
        <ModalContent bg='transparent' boxShadow='none'>
          <ModalCloseButton color='white' zIndex={2} />
          <ModalBody p={0} display='flex' justifyContent='center'>
            {isHtmlFigure(previewImageSrc) ? (
              <Box
                as='iframe'
                src={previewImageSrc}
                title={previewImageAlt}
                width='100%'
                height='80vh'
                border='none'
                borderRadius='md'
                bg='white'
              />
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
