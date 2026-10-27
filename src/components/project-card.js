import { Link } from '@/components/mdx'
import { Box, Card, Image, Stack, Text } from '@chakra-ui/react'

export const ProjectCard = ({ name, description, repo, homepage, logo }) => {
  return (
    <Card.Root
      as={Link}
      href={repo || homepage}
      p={4}
      rounded='lg'
      transitionProperty='all'
      transitionDuration='slower'
      transitionTimingFunction='ease-out'
      bg='gray.50'
      _hover={{
        transform: 'scale(1.025)',
        boxShadow: 'md',
        textDecoration: 'none',
      }}
    >
      <Card.Body p={0}>
        <Stack direction={'column'} justify={'space-between'} gap={0}>
          <Box>
            <Image
              h={'128'}
              w={'full'}
              src={logo}
              alt={name}
              objectFit='contain'
            />

            <Text my={4} lineClamp={4}>
              {description}
            </Text>
          </Box>
        </Stack>
      </Card.Body>
    </Card.Root>
  )
}
