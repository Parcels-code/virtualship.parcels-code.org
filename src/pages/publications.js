import { Layout } from '@/components/layout'
import {
  Box,
  Container,
  Heading,
  Text,
  Accordion,
  Image,
} from '@chakra-ui/react'
import { VSPublications } from '@/data/publications'
import { Paper } from '@/components/paper'

const vspublications = () => {
  return (
    <Layout
      title={'VirtualShip publication'}
      card={
        'https://github.com/Parcels-code/virtualship.parcels-code.org/blob/main/public/virtualship-assets/logo_no-text.png?raw=true'
      }
      url={`/publications`}
    >
      <Box as='section' py={20}>
        <Container maxW='container.lg'>
          <Box mb={8}>
            <Image
              src='/photos/photoDocVSwebpage.png'
              alt='360 photo of the deck of a Research Vessel'
              w='100%'
              h='auto'
              borderRadius='md'
            />
          </Box>
          <Heading as='h1' size='2xl' textAlign={'center'}>
            VirtualShip publications
          </Heading>

          <Box id='publications' />

          <Accordion.Root multiple variant='plain'>
            {VSPublications.reverse().map((paper, index, array) => (
              <Paper
                key={paper.title}
                published_info={paper.published_info}
                title={paper.title}
                authors={paper.authors}
                doi={paper.doi}
                abstract={paper.abstract}
                number={array.length - index}
              />
            ))}
          </Accordion.Root>
        </Container>
      </Box>
    </Layout>
  )
}

export default vspublications
