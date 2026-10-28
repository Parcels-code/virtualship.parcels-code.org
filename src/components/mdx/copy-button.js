import { Button, useClipboard } from '@chakra-ui/react'

export const CopyButton = ({ code, ...props }) => {
  const clipboard = useClipboard({ value: code })

  return (
    <Button
      size='sm'
      position='absolute'
      textTransform='uppercase'
      colorPalette='teal'
      fontSize='xs'
      height='24px'
      top={0}
      zIndex='1'
      right='1.25em'
      {...props}
      onClick={clipboard.copy}
    >
      {clipboard.copied ? 'Copied' : 'Copy'}
    </Button>
  )
}
