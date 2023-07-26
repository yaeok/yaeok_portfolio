'use client'
import { useState } from 'react'

import { Button, Flex, Text } from '@/common/design'
import liff from '@line/liff'

export default function NewConnectedLineScreen() {
  const [userId, setUserId] = useState('')
  const onClickConnectLine = async () => {
    const userInfo = await liff.getProfile()
    const id = userInfo.userId
    setUserId(id)
  }
  return (
    <Flex flexDirection='column'>
      <Button onClick={() => onClickConnectLine()}>LINEから情報取得</Button>
      <Text>{userId}</Text>
    </Flex>
  )
}
