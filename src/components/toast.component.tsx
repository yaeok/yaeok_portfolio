'use client'
import { Flex, Spinner, useToast } from '@/common/design'

type Props = {
  title: string
  status: string
  description?: string
}

export default function Toast(props: Props) {
  const toast = useToast()

  switch (props.status) {
    case 'success':
      return toast({
        title: props.title,
        status: 'success',
        description: props.description,
        duration: 2000,
        isClosable: true,
      })
    case 'error':
      return toast({
        title: props.title,
        status: 'error',
        description: props.description,
        duration: 2000,
        isClosable: true,
      })
    case 'warning':
      return toast({
        title: props.title,
        status: 'warning',
        description: props.description,
        duration: 2000,
        isClosable: true,
      })
    default:
      return toast({
        title: props.title,
        status: 'info',
        description: props.description,
        duration: 2000,
        isClosable: true,
      })
  }
}
