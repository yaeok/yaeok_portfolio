import NextLink from 'next/link'

import { Flex, Text } from '@/common/design'

type Props = {
  title?: string
  date: string
  description: string
}
export default function CareerBoxComponent(props: Props) {
  return (
    <Flex
      flexDirection='column'
      width={{ base: '300px', sm: '100%', md: '45%', lg: '30%' }}
      padding='10px 15px'
      bg='white'
      shadow='md'
      rounded='md'
      transition={'all 0.3s'}
      _hover={{
        top: '-5px',
        boxShadow: '10px 15px 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Text fontSize={{ sm: '12px', lg: '15px' }}>{props.title}</Text>
      <Text fontSize={{ sm: '12px', lg: '15px' }}>{props.date}</Text>
      {props.description.split('\n').map((value, index) => {
        return (
          <Text
            as='p'
            key={index}
            fontSize={{ base: '12px', sm: '5px', lg: '12px' }}
          >
            {value}
          </Text>
        )
      })}
    </Flex>
  )
}
