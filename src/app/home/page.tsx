'use client'
import { useRouter } from 'next/navigation'

import { SHOW_HOME } from '@/common/constants/path'
import { Flex, Heading, List, ListItem, Tag } from '@/common/design'

export default function HomeScreen() {
  const router = useRouter()
  return (
    <Flex
      flexDirection='column'
      justifyContent='center'
      gap='10px'
      marginX='100px'
    >
      <Heading size='lg'>ホーム画面</Heading>
      <List paddingY='10px'>
        {SHOW_HOME.map((value, index) => (
          <ListItem
            key={index}
            marginY='5px'
            padding='10px 25px'
            borderRadius='10px'
            border='1px solid #E6E6E6'
            cursor='pointer'
            onClick={() => router.push(value.path)}
            _hover={{ bg: 'green.200' }}
          >
            {value.name}
            {value.type ? (
              <Tag
                size='md'
                variant='outline'
                marginLeft='20px'
                colorScheme='blue'
              >
                {value.type}
              </Tag>
            ) : null}
          </ListItem>
        ))}
      </List>
    </Flex>
  )
}
