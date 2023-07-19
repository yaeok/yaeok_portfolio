import type { NextApiRequest, NextApiResponse } from 'next'

import * as line from '@line/bot-sdk'

import type { Message } from '@line/bot-sdk'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const client = new line.Client({
        channelAccessToken: process.env
          .NEXT_PUBLIC_CHANNEL_ACCESS_TOKEN as string,
      })

      const message: Message = {
        type: 'text',
        text: 'Hello World!',
      }

      const hoge = await client.pushMessage(req.query.to as string, message)

      res.json([req.query.to, hoge])
    }
  } catch (err: any) {
    res.json(err)
  }
}
