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
      <Container maxW='container.lg' py={0} centerContent>
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
            {findus.map((item, index) => (
              <Tooltip key={index} label={item.name}>
                <GridItem
                  as={Link}
                  href={item.url}
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  borderRight={
                    index < findus.length - 1 ? '1px solid #ccc' : 'none'
                  }
                  pr={4}
                >
                  <ColorModeImage
                    lightSrc={item.logo_light}
                    darkSrc={item.logo_dark}
                    maxH={20}
                    alt={item.name}
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
