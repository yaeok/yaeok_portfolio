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
  useToast,
  VStack,
} from '@/common/design'
import { messageState } from '@/common/states/message'
import { validateLoginScreen } from '@/common/utils/validation'
import Loading from '@/components/loading.component'
import { signInWithEmail } from '@/lib/firebase/apis/auth'

export default function LoginScreen() {
  const { handleSubmit, register } = useForm()
  const [show, setShow] = useState<boolean>(false)
  const setMessage = useSetRecoilState(messageState)
  const router = useRouter()
  const toast = useToast()
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    const error = validateLoginScreen(data.email, data.password)
    if (!error) {
      await signInWithEmail({
        email: data.email,
        password: data.password,
      }).then((res) => {
        if (res.isSuccess) {
          setMessage(true)
          toast({
            title: res.message,
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          router.push(HOME.path)
        } else {
          toast({
            title: res.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
        setLoading(false)
      })
    } else {
      toast({
        title: 'ログインに失敗しました',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  })

  return loading ? (
    <Loading />
  ) : (
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
