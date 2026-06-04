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
import { Funders as data } from '@/data/funders'

import { Heading } from '@/components/mdx'

export const Funders = () => {
  const funders = React.useMemo(() => data, [])
  return (
    <Box id={'funders'} as='section' bg='#27187E' color='white'>
      <Container maxW='container.lg' centerContent>
        <Box my={8}>
          <Text fontSize={'lg'} textAlign='center'>
            VirtualShip development has been supported by the following
            organisations
          </Text>

          <Grid
            templateColumns={`repeat(${funders.length}, minmax(auto, max-content))`}
            gap={6}
            my={4}
            justifyContent='center'
          >
            {funders.map((funder, index) => (
              <Tooltip key={index} label={funder.name}>
                <GridItem
                  as={Link}
                  href={funder.url}
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  borderRight={
                    index < funders.length - 1 ? '1px solid #ccc' : 'none'
                  }
                  pr={4}
                >
                  <ColorModeImage
                    lightSrc={funder.logo_light}
                    darkSrc={funder.logo_dark}
                    maxH={20}
                    alt={funder.name}
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
