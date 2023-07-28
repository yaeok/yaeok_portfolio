'use client'

import { useState } from 'react'

import { API_PATH } from '@/common/constants/path'
import { Button, Flex, Input } from '@/common/design'
import { getLineIdByUid } from '@/lib/firebase/apis/user'

export default function LinePushMessageScreen() {
  const [message, setMessage] = useState<string>('')
  const onClickMethod = async () => {
    await getLineIdByUid().then(async (res) => {
      if (res != null) {
        await fetch(API_PATH.PUSHMESSAGE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ lineId: res, message: message }),
        })
        setMessage('')
      }
    })
  }
  return (
    <Flex
      flexDirection='column'
      gap='25px'
      width='100%'
      paddingY='50px'
      justifyContent='center'
      alignItems='center'
    >
      <Input
        placeholder='メッセージを入力してください'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        width='100%'
        color='white'
        bg='green.400'
        _hover={{ bg: 'green.500' }}
        onClick={() => onClickMethod()}
      >
        個人ラインを送信
      </Button>
    </Flex>
  )
}
