'use client'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil'

import { AUTH, INDEX } from '@/common/constants/path'
import { Box, Button, Flex, Heading, useToast } from '@/common/design'
import { userState } from '@/common/states/user'
import { logout } from '@/lib/firebase/apis/auth'

export default function Header() {
  const router = useRouter()
  const toast = useToast()
  const user = useRecoilValue(userState)
  const onClickLogout = () => {
    logout().then((res) => {
      if (res.isSuccess) {
        toast({
          title: res.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        router.push(AUTH.path)
      } else {
        toast({
          title: 'ログアウトに失敗しました',
          description: res.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    })
  }
  return (
    <Box as='header' position={'sticky'} top={0} zIndex={'docked'}>
      <Flex
        bg='white'
        color='gray.600'
        minH='60px'
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle='solid'
        borderColor='gray.200'
        align='center'
      >
        <Flex flex={1} justify='space-between' maxW='container.xl' mx='auto'>
          <Heading as='h1' size='lg'>
            <NextLink href={INDEX.path}>developers</NextLink>
          </Heading>
          {user === null ? null : (
            <Button
              bg='red.500'
              color='white'
              _hover={{ bg: 'red.400' }}
              onClick={() => onClickLogout()}
            >
              ログアウト{user.username}
            </Button>
          )}
        </Flex>
        <p>{user?.username}</p>
      </Flex>
    </Box>
  )
}
