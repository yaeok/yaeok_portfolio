'use client'

import { useState } from 'react'

import { API_PATH } from '@/common/constants/path'
import { Button, Flex, Input } from '@/common/design'

export default function PushNotificationScreen() {
  const [message, setMessage] = useState('')
  const onClickMethod = async () => {
    const response = await fetch(API_PATH.SENDMESSAGE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message }),
    })
    setMessage('')
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
        bg='green.300'
        _hover={{ bg: 'green.400' }}
        onClick={() => onClickMethod()}
      >
        ラインを送信
      </Button>
    </Flex>
  )
}
