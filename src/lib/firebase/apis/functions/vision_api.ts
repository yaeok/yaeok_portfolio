import { httpsCallable } from 'firebase/functions'

import { functions } from '@/lib/firebase/config'

export const callVisionApi = async (imageUrl: string) => {
  try {
    const textDetection = httpsCallable(functions, 'textDetection')
    const response = await textDetection({ imageUrl: imageUrl })
    const result: any = response.data
    console.log('result:', result)
    return result
  } catch (error: any) {
    console.log(error.message)
  }
}
