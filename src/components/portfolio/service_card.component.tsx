import { FcReading } from 'react-icons/fc';

import { Flex, Icon, Square, Text } from '@/common/design';

type Props = {
  name: string
  experience: string
  color: string
  remark: string
  devlang: string
}
export default function ServiceCardComponent() {
  return (
    <Flex flexWrap='wrap' justify='center'>
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
          <Text>shikaron</Text>
          <Text>Next.js</Text>
        </Flex>
      </Square>
      <Square position='relative' bg='white' size='300px'>
        <Flex flexDirection='column' gap='10px' textAlign='center'>
          <Text>shikaron</Text>
          <Text>
            使用技術
            {/* {props.devlang} */}
          </Text>
        </Flex>
      </Square>
    </Flex>
  )
}
