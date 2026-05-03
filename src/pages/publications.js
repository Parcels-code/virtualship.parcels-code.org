import { Layout } from '@/components/layout'
import { Box, Container, Heading, Text, Accordion } from '@chakra-ui/react'
import { VSPublications } from '@/data/publications'
import { Paper } from '@/components/paper'

const vspublications = () => {
  return (
    <Layout
      title={'VirtualShip publication'}
      card={
        'https://raw.githubusercontent.com/OceanParcels/virtualship.parcels-code.org/main/public/parcels-assets/logo-no-text.png'
      }
      url={`/publications`}
    >
      <Box as='section' py={20}>
        <Container maxW='container.lg'>
          <Heading as='h1' size='2xl' textAlign={'center'}>
            VirtualShip publications
          </Heading>

          <Box id='publications' />

          <Accordion allowMultiple>
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
          </Accordion>
        </Container>
      </Box>
    </Layout>
  )
}

export default vspublications
