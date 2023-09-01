import NextLink from 'next/link';

import { Flex } from '@/common/design';

type Props = {
  title?: string
  url: string
}
export default function SquareBoxComponent(props: Props) {
  return (
    <Flex
      width='200px'
      height='200px'
      margin='15px'
      alignItems='center'
      justifyContent='center'
      as={NextLink}
      target='_blank'
      href={props.url}
      bg='white'
      shadow='md'
      rounded='lg'
      transition={'all 0.3s'}
      _hover={{
        top: '-5px',
        boxShadow: '10px 15px 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      {props.title}
    </Flex>
  )
}
