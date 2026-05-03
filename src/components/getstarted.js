import {
  Box,
  Button,
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
import { GetStarted as data } from '@/data/getstarted'

import { Heading } from '@/components/mdx'

export const GetStarted = () => {
  const getstarted = React.useMemo(() => data, [])
  return (
    <Box id={'getstarted'} as='section'>
      <Container maxW='container.lg' centerContent>
        <Heading as='h1' size='2xl'>
          Get started as
        </Heading>

        <Box my={8}>
          <Grid
            templateColumns={`repeat(${getstarted.length}, minmax(auto, max-content))`}
            gap={6}
            my={4}
            justifyContent='center'
          >
            {getstarted.map((getstarted, index) => (
              <Button
                useExternalIcon
                as={Link}
                // variant={'outline'}
                colorScheme={'blue'}
                href='{getstarted.url}'
              >
                {getstarted.name}
              </Button>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
