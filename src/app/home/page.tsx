'use client'
import { useRouter } from 'next/navigation'

import { SHOW_HOME } from '@/common/constants/path'
import { Flex, Heading, List, ListItem } from '@/common/design'

export default function HomeScreen() {
  const router = useRouter()
  return (
    <Flex flexDirection='column' gap='10px'>
      <Heading size='lg'>Home</Heading>
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
          </ListItem>
        ))}
      </List>
    </Flex>
  )
}
