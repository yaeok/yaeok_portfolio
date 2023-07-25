import NextLink from 'next/link'

import { Button, Flex } from '@/common/design'

export default function ConnectedLineScreen() {
  const url = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_DOMAIN}/line&state=hoge&bot_prompt=normal&scope=profile%20openid&nonce=foobar&prompt=consent`
  return (
    <Flex width='100%' justifyContent='center'>
      <Button
        as={NextLink}
        href={url}
        color='white'
        bg='green.400'
        marginTop='20px'
        _hover={{ bg: 'green.500' }}
      >
        LINE連携
      </Button>
    </Flex>
  )
}
