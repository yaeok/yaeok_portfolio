import { NextApiRequest, NextApiResponse } from 'next';

import * as line from '@line/bot-sdk';

import type { Message } from '@line/bot-sdk'

const config = {
  channelAccessToken: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET!,
  channelSecret: process.env.NEXT_PUBLIC_LINE_ACCESS_TOKEN!,
}

const client = new line.Client(config)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body.message)
  try {
    const message = req.body.message

    const postMessage: Message = {
      type: 'text',
      text: message,
    }
    
  } catch (e) {
    res.status(500).json({ message: `error! ${e} ` })
  }
}
