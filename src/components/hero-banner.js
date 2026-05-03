import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react'

import { Image, Link } from '@/components/mdx'

export const HeroBanner = () => {
  return (
    <Box id='about' as='section'>
      <Container maxW='container.lg' pt={24} centerContent>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          justify={'center'}
          direction={{ base: 'column', md: 'row' }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
            >
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  zIndex: -1,
                }}
              >
                VirtualShip
              </Text>
              <br />
              <Text as={'span'} color={'blue.400'}>
                Explore the ocean with a virtual research vessel
              </Text>
            </Heading>
            <Text fontSize={'lg'} mt={0}>
              <strong>VirtualShip</strong> provides a framework to plan and
              conduct a virtual research expedition, receiving measurements as
              if they were coming from actual oceanographic instruments.
            </Text>
          </Stack>
          <Stack flex={1} spacing={{ base: 10, md: 20 }}>
            {
              <Image
                src={'/homepage_image.png'}
                alt='Rendering of the new Dutch Research Vessel Anna Weber-van Bosse on a sea of data'
                objectFit='contain'
              ></Image>
            }
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
