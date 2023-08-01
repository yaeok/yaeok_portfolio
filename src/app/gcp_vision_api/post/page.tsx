'use client'
import { useRouter } from 'next/navigation'
import { FieldValues, useForm } from 'react-hook-form'

import { Button, Flex, Heading, Input, useToast } from '@/common/design'
import { validateDocumentPostForm } from '@/common/utils/validation'
import { registerImageDocument } from '@/lib/firebase/apis/image_document'

export default function VisionAPIPostScreen() {
  const toast = useToast()
  const router = useRouter()
  const { handleSubmit, register } = useForm()

  const onSubmit = handleSubmit(async (data: FieldValues) => {
    const validate = validateDocumentPostForm(data.name, data.imageUrl)
    if (validate.isSuccess) {
      const result = await registerImageDocument({
        imageName: data.name,
        file: data.imageUrl,
      })
      if (result.isSuccess) {
        alert('登録しました')
        toast({
          title: result.message,
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      } else {
        toast({
          title: result.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
    } else {
      toast({
        title: validate.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  })
  return (
    <Flex
      flexDirection='column'
      margin={{ base: '10p 10px', md: '10px 100px' }}
    >
      <Flex flexDirection='row' justifyContent='start'>
        <Button onClick={() => router.back()}>戻る</Button>
      </Flex>
      <form onSubmit={onSubmit}>
        <Flex flexDirection='column' gap='5px'>
          <Heading size='sm' paddingY='10px'>
            名前
          </Heading>
          <Input type='text' id='name' {...register('name')} />
          <Flex flexDirection='row' justifyContent='space-between'>
            <Flex flexDirection='column' gap='10px'>
              <Heading size='sm' paddingY='10px'>
                画像
              </Heading>
              <Input
                type='file'
                variant='unstyled'
                id='imageUrl'
                {...register('imageUrl')}
              />
            </Flex>
          </Flex>
          <Button
            marginTop='15px'
            type='submit'
            bg='green.100'
            _hover={{ bg: 'green.200' }}
          >
            登録
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}
