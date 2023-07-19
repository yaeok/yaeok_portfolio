import NextLink from 'next/link'

import { Button, Flex } from '@/common/design'

export default function ConnectedLineScreen() {
  const url = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=http://127.0.0.1:3000/line&state=hoge&bot_prompt=normal&scope=profile%20openid&nonce=foobar&prompt=consent`
  return (
    <Flex>
      <Button as={NextLink} href={url}>
        データ取得
      </Button>
    </Flex>
  )
}
