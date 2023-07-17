'use client'

import { Button, Flex } from '@/common/design'

export default function PushNotificationScreen() {
  const onClickMethod = async () => {
    const response = await fetch('http://localhost:3000/api/line', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Hello, LINE!' }),
    })
    console.log(response)
  }
  return (
    <Flex
      width='100%'
      paddingY='50px'
      justifyContent='center'
      alignItems='center'
    >
      <Button onClick={() => onClickMethod()}>ラインを送信</Button>
    </Flex>
  )
}
