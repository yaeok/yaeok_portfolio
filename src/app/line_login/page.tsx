import NextLink from 'next/link'

import { Box, Button, Flex, Text } from '@/common/design'

export default function LineLoginScreen() {
  const url = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_DOMAIN}/line_connect&state=hoge&bot_prompt=normal&scope=profile%20openid&nonce=foobar&prompt=consent`
  return (
    <Flex
      flexDirection='column'
      width='100%'
      justifyContent='center'
      alignItems='center'
      gap='10px'
    >
      <Button
        as={NextLink}
        href={url}
        color='white'
        bg='green.400'
        marginTop='20px'
        _hover={{ bg: 'green.500' }}
      >
        LINEへログインする
      </Button>
      <Box>
        <Text fontSize='12px'>
          LINEと連携することで評価コメントの通知等を受け取ることができます。
        </Text>
        <Text fontSize='12px'>
          LINEログインし、アクセスの許可後、連携ボタンを押下してください。
        </Text>
      </Box>
    </Flex>
  )
}
