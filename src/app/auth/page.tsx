'use client'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'

import { HOME } from '@/common/constants/path'
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@/common/design'
import { messageState } from '@/common/states/message'
import { validateLoginScreen } from '@/common/utils/validation'
import Toast from '@/components/toast.component'
import { signInWithEmail } from '@/lib/firebase/apis/auth'

export default function LoginScreen() {
  const { handleSubmit, register } = useForm()
  const [show, setShow] = useState<boolean>(false)
  const setMessage = useSetRecoilState(messageState)
  const router = useRouter()

  const onSubmit = handleSubmit(async (data) => {
    const error = validateLoginScreen(data.email, data.password)
    if (!error) {
      await signInWithEmail({
        email: data.email,
        password: data.password,
      }).then((res) => {
        if (res.isSuccess) {
          setMessage(true)
          Toast({
            title: res.message,
            status: 'success',
          })
          router.push(HOME.path)
        } else {
          Toast({
            title: res.message,
            status: 'error',
          })
        }
      })
    } else {
      Toast({
        title: 'ログインに失敗しました',
        status: 'error',
        description: error,
      })
    }
  })

  return (
    <Flex
      flexDirection='column'
      width='100%'
      height='100vh'
      justifyContent='center'
      alignItems='center'
    >
      <VStack spacing='5'>
        <Heading>ログイン画面</Heading>
        <form onSubmit={onSubmit}>
          <VStack spacing='4' alignItems='left'>
            <Box>
              <FormLabel htmlFor='email' textAlign='start'>
                email
              </FormLabel>
              <Input id='email' {...register('email')} />
            </Box>

            <Box>
              <FormLabel htmlFor='password'>password</FormLabel>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  {...register('password')}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
            <Button
              marginTop='4'
              colorScheme='teal'
              type='submit'
              paddingX='auto'
            >
              ログイン
            </Button>
            <Flex width='100%' justifyContent='center'>
              <Button
                marginTop='20px'
                as={NextLink}
                width='100%'
                bg='white'
                _hover={{ bg: 'red.400', color: 'white' }}
                href='/portfolio'
              >
                ログインせずに閲覧する
              </Button>
            </Flex>
          </VStack>
        </form>
      </VStack>
    </Flex>
  )
}
