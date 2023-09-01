'use client'
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

import { SHOW_HOME } from '@/common/constants/path';
import {
  Flex, Heading, keyframes, List, ListItem, Tag, usePrefersReducedMotion
} from '@/common/design';

const fadeIn = keyframes`
  from { opacity: 0;
	transform: translateY(50px); }
  to { opacity: 1;
	transform: translateY(0); }
`

export default function HomeScreen() {
  const router = useRouter()
  const prefersReducedMotion = usePrefersReducedMotion()
  const animation = prefersReducedMotion ? undefined : `${fadeIn} 1s linear`

  return (
    <Flex
      flexDirection='column'
      justifyContent='center'
      gap='10px'
      marginX={{ base: '10px', md: '100px' }}
    >
      <Heading size='lg'>ホーム画面</Heading>
      <List paddingY='10px'>
        {SHOW_HOME.map((value, index) => (
          <ListItem
            as={NextLink}
            key={index}
            display='block'
            marginY='5px'
            padding='10px 25px'
            borderRadius='md'
            bg='white'
            cursor='pointer'
            href={value.path}
            transition='all 0.3s ease-in-out'
            _hover={{ bg: 'blackAlpha.400' }}
            animation={animation}
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
