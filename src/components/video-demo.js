import { Box, Container } from '@chakra-ui/react'
import { Heading } from '@/components/mdx'
import React from 'react'

export const VideoDemo = () => {
  return (
    <Box id={'video-demo'} as='section' my={12}>
      <Container maxW='container.lg' pt={0} centerContent>
        <Box
          w='100%'
          maxW='800px'
          borderRadius='lg'
          overflow='hidden'
          boxShadow='md'
        >
          <iframe
            width='100%'
            height='450'
            src='https://www.youtube.com/embed/ypafzoTBj_A?si=gjQBAxzfNzslN4B_'
            title='VirtualShip Classroom Demonstration'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          ></iframe>
        </Box>
      </Container>
    </Box>
  )
}
