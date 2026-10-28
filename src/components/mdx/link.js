import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { LuExternalLink } from 'react-icons/lu'

export const Link = React.forwardRef(function CustomLink(props, ref) {
  const { href, children, useExternalIcon, ...rest } = props
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))
  const defaultLinkStyles = {
    color: 'blue.600',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
    textDecorationThickness: '1px',
    _hover: {
      color: 'blue.700',
      textDecorationThickness: '2px',
    },
  }

  if (isInternalLink) {
    return (
      <ChakraLink asChild {...defaultLinkStyles} {...rest}>
        <NextLink href={href} ref={ref}>
          {children}
        </NextLink>
      </ChakraLink>
    )
  }

  return (
    <ChakraLink asChild {...defaultLinkStyles} {...rest}>
      <NextLink
        href={href ?? '#'}
        ref={ref}
        target='_blank'
        rel='noopener noreferrer'
      >
        {children}
        {useExternalIcon && <LuExternalLink style={{ margin: '0 2px' }} />}
      </NextLink>
    </ChakraLink>
  )
})
