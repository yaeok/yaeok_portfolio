'use client'
import { useEffect, useState } from 'react'

import { Button, Flex, Text } from '@/common/design'
import { liff } from '@line/liff'

export default function NewConnectedLineScreen() {
  const [userId, setUserId] = useState('')
  useEffect(() => {
    liff.init({ liffId: '2000173986-kGY1gly6' }).then()
  }, [])
  const onClickConnectLine = async () => {
    if (liff.isLoggedIn()) {
      liff.ready.then(() => {
        const context = liff.getContext()
        setUserId(context?.userId ?? '取得できませんでした')
      })
    } else {
      liff.login({
        redirectUri: `${process.env.NEXT_PUBLIC_DOMAIN}/new_connected_line`,
      })
    }
  }
  return (
    <Flex flexDirection='column'>
      <Button onClick={() => onClickConnectLine()}>LINEから情報取得</Button>
      <Text>{userId}</Text>
    </Flex>
  )
}
