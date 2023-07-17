import { NextApiRequest, NextApiResponse } from 'next'

import * as line from '@line/bot-sdk'

import type { Message } from '@line/bot-sdk'

const config = {
  channelAccessToken:
    '+NfE8iKTtzyjNPil/btBqUjXvrgnYHwE/J5waFHk9boTMll1GiA2OgUDslY9PP4hQnFX9IRtzwiCDf5leae1b4MkTWFsevWdDqmb13Lg7BilboCUmk+W68xwDAEFZKKc6ivg/3Pf2pFmLbpo/82GSQdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'de523d934ea962c5c3168ddef6bcb358',
}

const client = new line.Client(config)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
    return
  }
  try {
    const message = req.body.message

    const postMessage: Message = {
      type: 'text',
      text: message,
    }
    await client.pushMessage('U1c8ea8d1180c7ca26f00a907d2c465d1', postMessage)

    res
      .status(200)
      .json({ message: `${message}というメッセージが送信されました。` })
  } catch (e) {
    res.status(500).json({ message: `error! ${e} ` })
  }
}
