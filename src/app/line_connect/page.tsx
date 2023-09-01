'use client'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { HOME } from '@/common/constants/path'
import { Button, Flex, useToast } from '@/common/design'
import { updateUserInfoByLineId } from '@/lib/firebase/apis/user'

export default function LineConnectScreen() {
  const searchParams = useSearchParams()
  const code = searchParams!.get('code')
  const router = useRouter()
  const toast = useToast()
  const [btnState, setBtnState] = useState<boolean>(false)

  const getToken = async () => {
    var params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    // 生成されたコードをパラメータに追加
    params.append('code', code as string)
    // リダイレクトURIをパラメータに追加
    params.append(
      'redirect_uri',
      `${process.env.NEXT_PUBLIC_DOMAIN}/line_connect`
    )
    // クライアントIDをパラメータに追加
    params.append('client_id', process.env.NEXT_PUBLIC_CLIENT_ID as string)
    // クライアントシークレットをパラメータに追加
    params.append(
      'client_secret',
      process.env.NEXT_PUBLIC_CLIENT_SECRET as string
    )

    // アクセストークン生成
    const token = await axios.post(
      'https://api.line.me/oauth2/v2.1/token',
      params
    )

    // IDトークンの検証
    var params_second = new URLSearchParams()
    // 生成されたトークンをパラメータに追加
    params_second.append('id_token', token.data.id_token)
    // クライアントIDをパラメータに追加
    params_second.append(
      'client_id',
      process.env.NEXT_PUBLIC_CLIENT_ID as string
    )
    // アクセストークンの検証
    const userdata = await axios.post(
      'https://api.line.me/oauth2/v2.1/verify',
      params_second
    )
    console.log(userdata)

    // ユーザー情報の更新
    await updateUserInfoByLineId(userdata.data.sub).then((res) => {
      if (res.isSuccess) {
        toast({
          title: res.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        router.push(HOME.path)
      } else {
        toast({
          title: res.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        setBtnState(true)
      }
    })
  }

  return (
    <Flex
      flexDirection='column'
      width='100%'
      justifyContent='center'
      alignItems='center'
      gap='10px'
    >
      <Button
        color='white'
        bg='green.400'
        marginTop='20px'
        _hover={{ bg: 'green.500' }}
        onClick={() => getToken()}
      >
        アカウントを連携する
      </Button>
      {btnState ? (
        <Button
          color='white'
          bg='green.400'
          marginTop='20px'
          _hover={{ bg: 'green.500' }}
          onClick={() => router.push(HOME.path)}
        >
          トップへ戻る
        </Button>
      ) : null}
    </Flex>
  )
}
