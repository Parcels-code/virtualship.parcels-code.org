import { DesktopNav } from '@/components/desktop-nav'
import { Link } from '@/components/mdx'
import { MobileNav } from '@/components/mobile-nav'
import { menuItems } from '@/data/menu-items'
import {
  Box,
  Container,
  Flex,
  IconButton,
  Image,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { LuMenu, LuX } from 'react-icons/lu'

export const Header = () => {
  const navItems = React.useMemo(() => menuItems, [])

  const { open, onToggle } = useDisclosure()

  return (
    <Box>
      <Flex
        as={'header'}
        pos='fixed'
        top={'0'}
        w={'full'}
        minH={'60px'}
        boxShadow={'sm'}
        zIndex={'999'}
        justify={'center'}
        color='black'
        css={{
          backdropFilter: 'saturate(180%) blur(5px)',
          backgroundColor: '#FFCD00',
        }}
      >
        <Container display='flex' maxW={'container.lg'} alignItems={'center'}>
          <Flex
            flex={{ base: '0', md: 'auto' }}
            ml={{ base: -2 }}
            mr={{ base: 6, md: 0 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              variant={'ghost'}
              size={'sm'}
              color='black'
              aria-label={'Toggle Navigation'}
            >
              {open ? <LuX size={14} /> : <LuMenu size={20} />}
            </IconButton>
          </Flex>

          <Flex
            flex={{ base: 1, md: 'auto' }}
            justify={{ base: 'start', md: 'start' }}
          >
            <Stack
              as={Link}
              href={'/'}
              direction={'row'}
              alignItems={'center'}
              gap={{ base: 2, sm: 4 }}
            >
              <Image
                w={48}
                src={'/virtualship-assets/logo-horo.png'}
                alt={'VirtualShip logo'}
              />
            </Stack>
          </Flex>

          <Stack
            direction={'row'}
            align={'center'}
            gap={{ base: 6, md: 8 }}
            flex={{ base: 1, md: 'auto' }}
            justify={'flex-end'}
          >
            <DesktopNav
              navItems={navItems}
              display={{ base: 'none', md: 'flex' }}
            />
          </Stack>
        </Container>
      </Flex>
      <MobileNav isOpen={open} navItems={navItems} />
    </Box>
  )
}
