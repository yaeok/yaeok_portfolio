'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import {
  Button,
  Flex,
  Heading,
  Input,
  List,
  ListItem,
  useToast,
} from '@/common/design'
import { validateContentScreen } from '@/common/utils/validation'
import { registerContent } from '@/lib/firebase/apis/content'

export default function CustomFormScreen() {
  const { handleSubmit, register, reset } = useForm()
  const router = useRouter()
  const [content, setContent] = useState<string[]>([''])
  const toast = useToast()
  const onChangeContent = (index: number, value: string) => {
    const newContent = [...content]
    newContent[index] = value
    setContent(newContent)
  }
  const onSubmit = handleSubmit((data: FieldValues) => {
    const result = validateContentScreen(data.title, content)
    if (result.isSuccess) {
      registerContent({
        title: data.title,
        content: content,
      }).then((res) => {
        if (res.isSuccess) {
          toast({
            title: res.message,
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
          reset()
          router.back()
        } else {
          toast({
            title: res.message,
            status: 'error',
            duration: 2000,
            isClosable: true,
          })
        }
      })
    } else {
      toast({
        title: result.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  })
  const onClickPlus = () => {
    setContent([...content, ''])
  }
  const onClickMinus = () => {
    if (content.length === 1) return
    setContent(content.slice(0, content.length - 1))
  }
  return (
    <Flex direction='column' paddingX={{ base: '10px', sm: '200px' }}>
      <form onSubmit={onSubmit}>
        <Flex
          flexDirection='column'
          paddingY='15px'
          bg='whiteAlpha.700'
          marginY='20px'
          padding='25px'
          borderRadius='25px'
        >
          <Heading size='sm' paddingY='10px'>
            名前
          </Heading>
          <Input
            type='text'
            bg='gray.200'
            padding='10px'
            marginY='5px'
            borderRadius='10px'
            id='title'
            {...register('title')}
          />
          <Heading size='sm' paddingY='5px'>
            内容
          </Heading>
          <List paddingY='5px'>
            {content.map((item, index) => (
              <ListItem key={index}>
                <Input
                  type='text'
                  bg='gray.200'
                  padding='10px'
                  marginY='5px'
                  borderRadius='10px'
                  onChange={(e) => {
                    onChangeContent(index, e.target.value)
                  }}
                  value={item}
                />
              </ListItem>
            ))}
          </List>
          <Flex flexDirection='row' justifyContent='space-between' gap='10px'>
            <Button
              width='100%'
              bg='blue.400'
              _hover={{ background: 'blue.200' }}
              onClick={() => onClickPlus()}
            >
              +
            </Button>
            <Button
              width='100%'
              bg='red.400'
              _hover={{ background: 'red.200' }}
              onClick={() => onClickMinus()}
            >
              -
            </Button>
          </Flex>
          <Button type='submit' marginY='25px'>
            登録する
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}
