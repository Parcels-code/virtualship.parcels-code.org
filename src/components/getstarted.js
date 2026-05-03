import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
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
  const [activeIndex, setActiveIndex] = React.useState(null)
  return (
    <Box id={'getstarted'} as='section'>
      <Container maxW='container.lg' centerContent>
        <Heading as='h1' size='2xl'>
          Get started as
        </Heading>

        <Box my={0} width='100%'>
          <Grid
            templateColumns={`repeat(${getstarted.length}, 1fr)`}
            gap={6}
            my={0}
            width='100%'
          >
            {getstarted.map((item, index) => (
              <Button
                key={index}
                bg='blue.400'
                color='white'
                _hover={{ bg: 'blue.700' }}
                borderRadius='md'
                width='100%'
                height='64px'
                fontSize='2xl'
                fontWeight='bold'
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                display='flex'
                alignItems='center'
                justifyContent='center'
              >
                {item.name}
              </Button>
            ))}
          </Grid>
          {activeIndex !== null && (
            <Box mt={4} width='100%'>
              <Text fontSize={'lg'}>{getstarted[activeIndex].text}</Text>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  )
}
