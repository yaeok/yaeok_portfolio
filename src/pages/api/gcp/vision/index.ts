import { NextApiRequest, NextApiResponse } from 'next'

import vision from '@google-cloud/vision'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const imageUrl = req.body.imageUrl
  console.log('imageUrl:', imageUrl)

  try {
    const client = new vision.ImageAnnotatorClient({
      projectId: process.env.NEXT_PUBLIC_GCP_PROJECT_ID,
      keyFilename: './key.json',
    })

    const [result] = await client.textDetection(imageUrl)
    const detections = result.textAnnotations

    const detectedTexts = detections?.map(
      (annotation) => annotation.description
    )

    console.log('Detected texts:', detectedTexts)
    res.status(200).json({ texts: detectedTexts })
  } catch (error) {
    console.error('Error detecting text:', error)
    res.status(500).json({ error: 'Error detecting text' })
  }
}
