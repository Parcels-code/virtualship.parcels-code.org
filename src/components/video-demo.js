import { AspectRatio, Box, Container, Image } from '@chakra-ui/react'
import React from 'react'

export const VideoDemo = () => {
  const videoId = 'ypafzoTBj_A'
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false)
  const [thumbnailUnavailable, setThumbnailUnavailable] = React.useState(false)

  return (
    <Box
      id={'video-demo'}
      as='section'
      mt={0}
      mb={0}
      pb={0}
      pt={12}
      bg='#758BFD'
      color='white'
    >
      <Container maxW='container.lg' pt={0} centerContent>
        <AspectRatio
          ratio={16 / 9}
          w='100%'
          maxW='800px'
          borderRadius='lg'
          overflow='hidden'
          boxShadow='md'
        >
          {isVideoLoaded || thumbnailUnavailable ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=${isVideoLoaded ? 1 : 0}&rel=0`}
              title='VirtualShip Classroom Demonstration'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            ></iframe>
          ) : (
            <Box
              as='button'
              type='button'
              position='relative'
              w='100%'
              h='100%'
              onClick={() => setIsVideoLoaded(true)}
              aria-label='Play VirtualShip Classroom Demonstration video'
            >
              <Image
                src='/video-thumbnails/virtualship-demo.jpg'
                alt='Preview frame for VirtualShip Classroom Demonstration'
                w='100%'
                h='100%'
                objectFit='cover'
                onError={() => setThumbnailUnavailable(true)}
              />
              <Box
                position='absolute'
                top='50%'
                left='50%'
                transform='translate(-50%, -50%)'
                bg='blackAlpha.700'
                color='white'
                borderRadius='full'
                w='64px'
                h='64px'
                display='flex'
                alignItems='center'
                justifyContent='center'
                fontSize='2xl'
                lineHeight='1'
              >
                ▶
              </Box>
            </Box>
          )}
        </AspectRatio>
      </Container>
    </Box>
  )
}
