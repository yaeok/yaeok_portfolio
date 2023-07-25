import { addDoc, collection } from 'firebase/firestore'

import { ContentResult } from '@/common/models/content.type'
import { db } from '@/lib/firebase/config'

export const registerContent = async (args: {
  title: string
  content: string[]
}): Promise<ContentResult> => {
  let result: ContentResult = { isSuccess: false, message: '' }
  const colRef = collection(db, 'contents')

  result = await addDoc(colRef, {
    title: args.title,
    content: args.content,
  }).then((res) => {
    console.log(res)
    return { isSuccess: true, message: '登録しました。' }
  })

  return result
}
