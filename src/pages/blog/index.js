import {
  Avatar,
  AvatarGroup,
  Box,
  Container,
  Heading,
  Separator,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'

import { motion } from 'framer-motion'

import { Layout } from '@/components/layout'
import { Link } from '@/components/mdx'
import { distanceToNow, formatDate } from '@/lib/date-formatting'
import { getSortedPostsMetadata } from '@/lib/posts'
import { generateRssFeed } from '@/lib/rss-feed'

const SinglePost = ({ page }) => {
  const date = new Date(page.date)

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Stack
        gap='2'
        align='stretch'
        my={{ base: 5, md: 10 }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Box>
          <Link href={`/blog/${page.id}`} fontSize={'xl'} fontWeight={'bold'}>
            {page.title}
          </Link>

          <Text fontSize={'sm'} color={'gray.600'} py={4}>
            {formatDate(date)} ({distanceToNow(date)})
          </Text>

          <Text lineClamp={3} py={4}>
            {page.summary}
          </Text>
        </Box>
        <Spacer />
        <Box>
          <AvatarGroup size={'2xl'} spaceX={-3}>
            {page.authors.map((author) => {
              return (
                <Avatar.Root key={author.name}>
                  <Avatar.Fallback name={author.name} />
                  <Avatar.Image
                    src={`https://github.com/${author.github}.png`}
                  />
                </Avatar.Root>
              )
            })}
          </AvatarGroup>
        </Box>
      </Stack>
    </motion.div>
  )
}

export default function Blog({ allPostsData }) {
  return (
    <Layout
      title={'Blog | VirtualShip'}
      url={`/blog`}
      card={
        'https://github.com/Parcels-code/virtualship.parcels-code.org/blob/main/public/virtualship-assets/logo_no-text.png?raw=true'
      }
    >
      <Box as='section'>
        <Container maxW='container.lg' py={20}>
          <Heading as='h1' size='2xl' textAlign={'center'} my={4}>
            Blog
          </Heading>
          <Text color={'gray.800'} fontSize={'lg'} textAlign={'center'}>
            Announcements and news from the VirtualShip team.
          </Text>

          <Separator my={4} borderColor='gray.200' />

          <VStack
            separator={<Separator my={-4} borderColor='gray.200' />}
            gap={0}
            align='stretch'
          >
            {allPostsData.map((page) => {
              return <SinglePost key={page.id} page={page} />
            })}
          </VStack>
          <Separator my={2} borderColor='gray.200' />
        </Container>
      </Box>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsMetadata()
  generateRssFeed(allPostsData)
  return {
    props: {
      allPostsData,
    },
  }
}
