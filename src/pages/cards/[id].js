import { Image } from '@/components/mdx'
import { formatDate } from '@/lib/date-formatting'
import { getAllPostsIds, getPostData } from '@/lib/posts'
import {
  Avatar,
  AvatarGroup,
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { MdOutlineCalendarToday, MdPeopleOutline } from 'react-icons/md'

const Card = ({ frontmatter, id }) => {
  const date = new Date(frontmatter.date)

  return (
    <Box bg='teal.100' minH='100vh' w='100vw'>
      <Container maxW='container.lg' h='100%' py={12}>
        <Flex direction='column' h='100%' justify='center'>
          <Flex justifyContent='space-between' alignItems='flex-start' mb={6}>
            <Text fontSize='xl' color='gray.700' fontWeight='medium'>
              Parcels / blog
            </Text>
            <Image
              w='150px'
              h='auto'
              objectFit='contain'
              src='/virtualship-assets/logo_no-text.png'
              alt='Parcels logo'
            />
          </Flex>

          <VStack align='stretch' gap={16} my={12}>
            <Heading as='h1' size='3xl' fontWeight='bold' lineHeight='1.2'>
              {frontmatter.title}
            </Heading>

            <Flex
              direction={['column', 'row']}
              justify='space-between'
              align={['flex-start', 'center']}
              wrap='wrap'
              gap={4}
            >
              <Flex align='center'>
                <Icon w={6} h={6} mr={2} color='gray.700'>
                  <MdOutlineCalendarToday />
                </Icon>
                <Text fontSize='lg' fontWeight='medium'>
                  {formatDate(date)}
                </Text>
              </Flex>
            </Flex>

            <Flex align='center'>
              <Icon w={6} h={6} mr={2} color='gray.700'>
                <MdPeopleOutline />
              </Icon>
              <AvatarGroup spaceX='-0.75rem'>
                {frontmatter.authors.slice(0, 5).map((author) => (
                  <Avatar.Root key={author.name} boxSize={24}>
                    <Avatar.Fallback name={author.name} />
                    <Avatar.Image
                      src={`https://github.com/${author.github}.png`}
                    />
                  </Avatar.Root>
                ))}
              </AvatarGroup>
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Box>
  )
}

export default Card

export async function getStaticPaths() {
  const paths = getAllPostsIds()

  const isDev = process.env.NODE_ENV === 'development'
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths: isDev ? paths : [], fallback: false }
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id)
  const filePath = path.join(process.cwd(), 'src/posts', postData.file)
  const source = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(source)
  return { props: { frontmatter: data, id: params.id } }
}
