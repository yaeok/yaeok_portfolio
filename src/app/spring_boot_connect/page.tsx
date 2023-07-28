'use client'
import { useState } from 'react'

import { Button, Flex, Input, Text } from '@/common/design'

export default function ConnectedAPI() {
  const [result, setResult] = useState<{
    message: string
    username: string
    email: string
  }>()
  const getAPI = async () => {
    const url = 'http://localhost:8080/api/v1/getmessage'
    await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setResult(data)
      })
  }

  /** 送信用 */
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const postAPI = async () => {
    const url = 'http://localhost:8080/api/v1/postmessage'
    await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        message: message,
        username: username,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResult(data)
      })
  }
  return (
    <>
      <Flex
        width='100%'
        justifyContent='center'
        flexDirection='column'
        gap='10px'
        marginY='50px'
      >
        <Flex flexDirection='row' gap='10px' width='100%'>
          <Button flexGrow='1' onClick={() => getAPI()}>
            データ取得
          </Button>
          <Button flexGrow='1' onClick={() => setResult(undefined)}>
            クリア
          </Button>
        </Flex>
        <Text textAlign='center'>{result?.message}</Text>
        <Text textAlign='center'>{result?.username}</Text>
        <Text textAlign='center'>{result?.email}</Text>
      </Flex>
      <Flex
        width='100%'
        justifyContent='center'
        flexDirection='column'
        gap='10px'
        marginY='50px'
      >
        <Flex flexDirection='row' gap='10px' width='100%'>
          <Button flexGrow='1' onClick={() => postAPI()}>
            データ送信
          </Button>
          <Button
            flexGrow='1'
            onClick={() => {
              setResult(undefined)
              setMessage('')
              setUsername('')
              setEmail('')
            }}
          >
            クリア
          </Button>
        </Flex>
        <Input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Flex>
    </>
  )
}
