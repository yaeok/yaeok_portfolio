'use client'
import { useRouter } from 'next/navigation'

import { FILE_PATH } from '@/common/constants/path'
import { Flex, Heading, List, ListItem } from '@/common/design'

export default function TopScreen() {
  const router = useRouter()
  const screenTransition = (path: string) => {
    router.push(path)
  }
  return (
    <Flex flexDirection='column' width='100%' gap='15px' paddingY='20px'>
      <Heading size='md'>ホーム画面</Heading>
      <List>
        {FILE_PATH.sort((a, b) => a.id - b.id).map((path, index) => (
          <ListItem
            bg='green.300'
            fontSize='15px'
            marginY='5px'
            padding='10px 20px'
            borderRadius='10px'
            cursor='pointer'
            _hover={{ bg: 'green.200' }}
            key={index}
            onClick={() => screenTransition(path.path)}
          >
            {path.name}
          </ListItem>
        ))}
      </List>
    </Flex>
  )
}
