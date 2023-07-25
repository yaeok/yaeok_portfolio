'use client'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'

import { API_PATH } from '@/common/constants/path'
import { Button, Flex } from '@/common/design'

export default function Line() {
  const searchParams = useSearchParams()
  const code = searchParams!.get('code')

  const getToken = async () => {
    // アクセストークンの発行
    console.log(code)
    var params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('code', code as string)
    params.append('redirect_uri', `${process.env.NEXT_PUBLIC_DOMAIN}/line`)
    params.append('client_id', process.env.NEXT_PUBLIC_CLIENT_ID as string)
    params.append(
      'client_secret',
      process.env.NEXT_PUBLIC_CLIENT_SECRET as string
    )

    const token = await axios.post(
      'https://api.line.me/oauth2/v2.1/token',
      params
    )
    console.log('token: ', token.data)

    // IDトークンの検証
    var params_second = new URLSearchParams()
    params_second.append('id_token', token.data.id_token)
    params_second.append(
      'client_id',
      process.env.NEXT_PUBLIC_CLIENT_ID as string
    )
    const userdata = await axios.post(
      'https://api.line.me/oauth2/v2.1/verify',
      params_second
    )
    console.log('userdata: ', userdata.data)

    const data = {
      params: {
        to: userdata.data.sub,
      },
    }

    const result = await axios.get(API_PATH.PUSH, data)
    console.log(result)
  }

  return (
    <Flex width='100%' justifyContent='center'>
      <Button
        color='white'
        bg='green.400'
        marginTop='20px'
        _hover={{ bg: 'green.500' }}
        onClick={() => getToken()}
      >
        メッセージ送信
      </Button>
    </Flex>
  )
}
