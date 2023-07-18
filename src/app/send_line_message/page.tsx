'use client'

import { useState } from 'react'

import { Button, Flex, Input } from '@/common/design'

export default function PushNotificationScreen() {
  const [message, setMessage] = useState('')
  const onClickMethod = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN!}/api/line`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      }
    )
    const data = await response.json()
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
