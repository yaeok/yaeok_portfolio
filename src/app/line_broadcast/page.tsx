'use client'

import { useState } from 'react'

import { API_PATH } from '@/common/constants/path'
import { Button, Flex, Input } from '@/common/design'

export default function LineBroadCastScreen() {
  const [message, setMessage] = useState<string>('')
  const onClickMethod = async () => {
    await fetch(API_PATH.BROADCAST, {
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
        color='white'
        bg='green.400'
        _hover={{ bg: 'green.500' }}
        onClick={() => onClickMethod()}
      >
        公式ライン全体に送信
      </Button>
    </Flex>
  )
}
