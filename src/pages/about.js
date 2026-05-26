import { Layout } from '@/components/layout'
import { Image, Link } from '@/components/mdx'
import { Box, Container, Heading, SimpleGrid, Text } from '@chakra-ui/react'

const About = () => {
  return (
    <Layout
      title={'About the VirtualShip'}
      card={
        'https://github.com/Parcels-code/virtualship.parcels-code.org/blob/main/public/virtualship-assets/logo_no-text.png?raw=true'
      }
      url={`/about`}
    >
      <Box as='section' py={20}>
        <Container maxW='container.lg'>
          <Heading as='h1' size='2xl' textAlign={'center'}>
            About the VirtualShip
          </Heading>

          <Box py={8}>
            <Text>
              VirtualShip is a collaborative project developed at{' '}
              <Link href='https://www.uu.nl/en' isExternal>
                Utrecht University
              </Link>{' '}
              in partnership with the{' '}
              <Link href='https://www.nioz.nl/en' isExternal>
                Royal Netherlands Institute for Sea Research (NIOZ)
              </Link>{' '}
              to advance how oceanographic fieldwork can be taught, planned, and
              explored in a “digital ocean.”
            </Text>
            <Text mt={4}>
              Users are able to design expeditions anywhere in the global ocean,
              deploy virtual oceanographic instruments, and receive measurements
              as though they were collected during a real research expedition.
              In this way, VirtualShip addresses the growing challenges of
              limited ship access, high expedition costs, and environmental
              burdens all the while expanding access to near-authentic fieldwork
              experiences.
            </Text>
            <Text mt={4}>
              At the core of the project is the VirtualShip Python package,
              which simulates realistic instrument deployments, streaming
              environmental data directly from the{' '}
              <Link href='https://marine.copernicus.eu/' isExternal>
                EU's Copernicus Marine Data Store
              </Link>
              . Alongside the software, VirtualShip includes VR/360° shipboard
              immersive videos and educational materials that help bridge the
              gap between theory and real-world marine science practice.
            </Text>
            <Text mt={4}>
              VirtualShip serves multiple communities simultaneously: students
              attending marine science courses, educators designing engaging
              fieldwork-based teaching, researchers planning expeditions and/or
              testing deployment strategies, and developers (which may stem from
              any of the former three groups) or external contributors that help
              co-create these novel pedagogical & research tools.
            </Text>
            <Text mt={4}>
              The project has already been trialled and integrated into 8
              teaching cycles at{' '}
              <Link href='https://www.uu.nl/en' isExternal>
                Utrecht University
              </Link>{' '}
              and is expanding through an NKO Scale-up grant for collaboration
              with Wageningen University, RU Groningen, TU Delft, and the
              University of Amsterdam.
            </Text>
          </Box>
        </Container>
      </Box>
    </Layout>
  )
}

export default About
