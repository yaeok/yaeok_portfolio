import NextLink from 'next/link';
import { FcReading } from 'react-icons/fc';

import { Flex, Heading, Icon, Square, Text } from '@/common/design';

type Props = {
  index: number
  link: string
  title: string
  devlang: string
  description: string
}
export default function ServiceCardComponent(props: Props) {
  return props.index % 2 === 0 ? (
    <Flex flexWrap='wrap' justify='center'>
      <Square position='relative' bg='red.400' size='300px'>
        <Flex
          flexDirection='column'
          gap='10px'
          textAlign='center'
          marginX='10px'
        >
          <Icon
            as={FcReading}
            width='50px'
            height='50px'
            top='15px'
            left='15px'
            position='absolute'
          />
          <Text>
            使用技術：
            {props.devlang}
          </Text>
          <Flex flexDirection='column' textAlign='start' marginX='20px'>
            {props.description.split('¥n').map((line, index) => (
              <Text key={index} fontSize='sm'>
                {line}
              </Text>
            ))}
          </Flex>
        </Flex>
      </Square>
      <Square position='relative' bg='white' size='300px'>
        <Flex flexDirection='column' gap='10px' textAlign='center'>
          <Heading>{props.title}</Heading>
          <Text as={NextLink} href={props.link} target='_blank'>
            サービスはこちらから
          </Text>
        </Flex>
      </Square>
    </Flex>
  ) : (
    <Flex flexWrap='wrap' justify='center'>
      <Square position='relative' bg='white' size='300px'>
        <Flex flexDirection='column' gap='10px' textAlign='center'>
          <Heading>{props.title}</Heading>
          <Text as={NextLink} href={props.link} target='_blank'>
            サービスはこちらから
          </Text>
        </Flex>
      </Square>
      <Square position='relative' bg='red.400' size='300px'>
        <Flex flexDirection='column' gap='10px' textAlign='center'>
          <Icon
            as={FcReading}
            width='50px'
            height='50px'
            top='15px'
            left='15px'
            position='absolute'
          />
          <Text>
            使用技術：
            {props.devlang}
          </Text>
          <Flex flexDirection='column' textAlign='start' marginX='20px'>
            {props.description.split('¥n').map((line, index) => (
              <Text key={index} fontSize='sm'>
                {line}
              </Text>
            ))}
          </Flex>
        </Flex>
      </Square>
    </Flex>
  )
}
