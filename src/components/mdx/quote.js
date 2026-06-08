import { Alert } from '@chakra-ui/react'

export const Quote = (props) => {
  return (
    <Alert
      mt={4}
      w='98%'
      bg={'blue.50'}
      variant='left-accent'
      status='info'
      css={{
        '> *:first-of-type': {
          marginTop: 0,
          marginLeft: 8,
        },
      }}
      {...props}
    />
  )
}
