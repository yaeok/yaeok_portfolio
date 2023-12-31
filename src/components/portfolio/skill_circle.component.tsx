import NextLink from 'next/link'

import {
  Flex,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from '@/common/design'

type Props = {
  name: string
  experience: string
  color: string
  remark: string
}
export default function SkillCircleComponent(props: Props) {
  return (
    <Popover>
      <PopoverTrigger>
        <Flex
          flexDirection='column'
          width={{ base: '150px', sm: '150px', lg: '200px' }}
          height={{ base: '150px', sm: '150px', lg: '200px' }}
          shadow='lg'
          rounded='100px'
          margin='5px'
          justifyContent='center'
          alignItems='center'
          cursor='pointer'
          transition={'all 0.3s'}
          _hover={{
            top: '-5px',
            boxShadow: '10px 15px 10px rgba(0, 0, 0, 0.3)',
            transform: 'scale(1.1)',
          }}
          background={`radial-gradient(at 30% 30%, white, ${props.color} 90%)`}
          background-position='100% 0'
          backgroundSize='100% 100%'
        >
          <Text fontSize={{ sm: '12px', lg: '15px' }}>{props.name}</Text>
          <Text fontSize={{ sm: '12px', lg: '15px' }}>{props.experience}</Text>
        </Flex>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          {props.remark.split(',').map((value, index) => {
            return (
              <Text as='p' key={index} fontSize={{ sm: '5px', lg: '15px' }}>
                {value}
              </Text>
            )
          })}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
