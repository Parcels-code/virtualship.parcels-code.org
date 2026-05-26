import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

export const Link = React.forwardRef(function CustomLink(props, ref) {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))
  const { useExternalIcon, ...rest } = props
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
      <ChakraLink as={NextLink} ref={ref} {...defaultLinkStyles} {...rest}>
        {rest.children}
      </ChakraLink>
    )
  }

  return (
    <ChakraLink
      isExternal
      as={NextLink}
      ref={ref}
      {...defaultLinkStyles}
      {...rest}
    >
      {rest.children}
      {useExternalIcon && <ExternalLinkIcon mx='2px' />}
    </ChakraLink>
  )
})
