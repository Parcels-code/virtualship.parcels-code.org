import { Link } from '@/components/mdx'
import {
  Box,
  Flex,
  HoverCard,
  Icon,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react'
import { LuChevronRight } from 'react-icons/lu'

const NavLink = ({ navItem, ...props }) => (
  <Link
    p={2}
    href={navItem.href ?? '/#'}
    fontSize={'sm'}
    fontWeight={'bold'}
    whiteSpace={'nowrap'}
    flexShrink={0}
    color='black'
    textDecoration='none'
    _hover={{
      textDecoration: 'none',
      color: 'black',
    }}
    {...props}
  >
    {navItem.label}
  </Link>
)

export const DesktopNav = ({ navItems, ...props }) => {
  return (
    <Stack direction={'row'} gap={4} {...props}>
      {navItems.map((navItem) => (
        <Box key={navItem.label}>
          {navItem.children ? (
            <HoverCard.Root positioning={{ placement: 'bottom-start' }}>
              <HoverCard.Trigger asChild>
                <NavLink navItem={navItem} />
              </HoverCard.Trigger>
              <Portal>
                <HoverCard.Positioner>
                  <HoverCard.Content
                    border={0}
                    boxShadow={'xl'}
                    bg={'white'}
                    p={4}
                    rounded={'xl'}
                    minW={'sm'}
                  >
                    <Stack>
                      {navItem.children.map((child) => (
                        <DesktopSubNav key={child.label} {...child} />
                      ))}
                    </Stack>
                  </HoverCard.Content>
                </HoverCard.Positioner>
              </Portal>
            </HoverCard.Root>
          ) : (
            <NavLink navItem={navItem} />
          )}
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href ?? '#'}
      className='group'
      display={'block'}
      p={2}
      rounded={'md'}
      textDecoration='none'
      _hover={{ bg: 'blue.50' }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'blue.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'blue.400'} w={5} h={5}>
            <LuChevronRight />
          </Icon>
        </Flex>
      </Stack>
    </Link>
  )
}
