import {
  Box,
  Container,
  Image,
  Text,
  Link,
  Grid,
  GridItem,
  Tooltip,
} from '@chakra-ui/react'
import { ColorModeImage } from '@/components/ColorModeImage'
import React from 'react'
import { FindUs as data } from '@/data/findus'

import { Heading } from '@/components/mdx'

export const FindUs = () => {
  const findus = React.useMemo(() => data, [])
  return (
    <Box id={'findus'} as='section'>
      <Container maxW='container.lg' centerContent>
        <Heading as='h1' size='2xl'>
          Find us on
        </Heading>

        <Box my={8}>
          <Grid
            templateColumns={`repeat(${findus.length}, minmax(auto, max-content))`}
            gap={6}
            my={4}
            justifyContent='center'
          >
            {findus.map((findus, index) => (
              <Tooltip key={index} label={findus.name}>
                <GridItem
                  as={Link}
                  href={findus.url}
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  borderRight={
                    index < findus.length - 1 ? '1px solid #ccc' : 'none'
                  }
                  pr={4}
                >
                  <ColorModeImage
                    lightSrc={findus.logo_light}
                    darkSrc={findus.logo_dark}
                    maxH={20}
                    alt={findus.name}
                  />
                </GridItem>
              </Tooltip>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
