import { Alert } from '@chakra-ui/react'

export const Quote = ({ children, ...props }) => {
  return (
    <Alert.Root
      mt={4}
      w='98%'
      bg={'blue.50'}
      status='info'
      borderStartWidth='4px'
      borderStartColor='blue.500'
      css={{
        '& > *:first-of-type': {
          marginTop: 0,
          marginLeft: 8,
        },
      }}
      {...props}
    >
      <Alert.Content>{children}</Alert.Content>
    </Alert.Root>
  )
}
