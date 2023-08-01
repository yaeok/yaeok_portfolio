'use client'

import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { GCP_VISION_API } from '@/common/constants/path'
import { Button, Flex, Heading, List, ListItem } from '@/common/design'
import { ImageDocument } from '@/common/models/image_document'
import Loading from '@/components/loading.component'
import { getAllImageDocuments } from '@/lib/firebase/apis/image_document'

export default function VisionAPIListScreen() {
  const router = useRouter()
  const [documents, setDocuments] = useState<ImageDocument[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const fetch = async () => {
      await getAllImageDocuments().then((res) => setDocuments(res))
      setLoading(false)
    }
    fetch()
  }, [])
  return loading ? (
    <Loading />
  ) : (
    <Flex
      flexDirection='column'
      justifyContent='center'
      gap='10px'
      margin={{ base: '10p 10px', md: '10px 100px' }}
    >
      <Flex flexDirection='row' justifyContent='space-between'>
        <Heading size='md' paddingY='10px'>
          画像認識
        </Heading>
        <Button as={NextLink} href={GCP_VISION_API.post}>
          新規登録
        </Button>
      </Flex>
      <List>
        {documents.map((document, index) => (
          <ListItem
            key={index}
            marginY='5px'
            padding='10px 25px'
            borderRadius='10px'
            border='1px solid #E6E6E6'
            paddingY='10px'
            onClick={() => router.push(GCP_VISION_API.detail(document.id))}
            cursor='pointer'
            _hover={{ bg: 'gray.100' }}
          >
            {document.imageName}
          </ListItem>
        ))}
      </List>
    </Flex>
  )
}
