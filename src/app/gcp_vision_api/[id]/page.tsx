'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Textarea,
  useToast,
} from '@/common/design'
import { ImageDocument } from '@/common/models/image_document'
import Loading from '@/components/loading.component'
import { callVisionApi } from '@/lib/firebase/apis/functions/vision_api'
import {
  getImageDocument,
  updateImageDocument,
} from '@/lib/firebase/apis/image_document'

type Props = {
  params: {
    id: string
  }
}

export default function VisionAPIDetailScreen({ params }: Props) {
  const router = useRouter()
  const toast = useToast()
  const [document, setDocument] = useState<ImageDocument>()
  const [loading, setLoading] = useState<boolean>(true)
  const [result, setResult] = useState<string>()
  const onClickVisionAPI = async (imageUrl: string) => {
    await callVisionApi(imageUrl).then((res) => {
      console.log(res[0])
      setResult(res[0])
    })
  }
  const onClickUpdate = async () => {
    if (result != null && result != '') {
      await updateImageDocument({ id: params.id, imageContent: result }).then(
        (res) => {
          if (res.isSuccess) {
            toast({
              title: res.message,
              status: 'success',
              duration: 2000,
              isClosable: true,
            })
          } else {
            toast({
              title: res.message,
              status: 'error',
              duration: 2000,
              isClosable: true,
            })
          }
        }
      )
    } else {
      toast({
        title: '解析結果がありません',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }
  useEffect(() => {
    const fetch = async () => {
      await getImageDocument(params.id).then((res) => {
        setDocument(res)
        setResult(res.imageContent)
      })
      setLoading(false)
    }
    fetch()
  }, [])
  return loading ? (
    <Loading />
  ) : (
    <Flex
      flexDirection='column'
      gap='10px'
      margin={{ base: '10p 10px', md: '10px 100px' }}
    >
      <Flex flexDirection='row' justifyContent='start'>
        <Button onClick={() => router.back()}>戻る</Button>
      </Flex>
      <Heading size='sm' paddingY='10px'>
        {document?.imageName}
      </Heading>
      <Flex justifyContent='center'>
        {document?.imageUrl == '' || null ? (
          <Text>画像はまだ登録されていません</Text>
        ) : (
          <Image
            maxWidth='250px'
            maxHeight='250px'
            src={document?.imageUrl}
            alt={document?.imageName}
          />
        )}
      </Flex>
      {document?.imageContent == '' ? (
        <>
          <Button onClick={() => onClickVisionAPI(document!.imageUrl)}>
            解析
          </Button>
          <Textarea
            value={result}
            onChange={(e) => setResult(e.target.value)}
          />
          <Button
            disabled={result == '' && null ? false : true}
            onClick={() => onClickUpdate()}
          >
            解析結果を保存する
          </Button>
        </>
      ) : (
        <Text>{document?.imageContent}</Text>
      )}
    </Flex>
  )
}
