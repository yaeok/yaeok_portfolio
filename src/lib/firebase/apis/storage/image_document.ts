import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { storage } from '@/lib/firebase/config'

/**
 * Storageへファイルを登録
 * @param file
 * @returns Promise<string>
 */
export const registerDocFromStorage = async (file: File[]): Promise<string> => {
  const urlList = new Array<string>()
  for (const item of file) {
    const fullPath = `documents/` + item.name
    const uploadRef = ref(storage, fullPath)

    await uploadBytes(uploadRef, item)
    urlList.push(item.name)
  }
  return urlList[0]
}

/**
 * ドキュメントのURLを取得
 * @param imageUrl
 * @returns Promise<string>
 */
export const getDocImageUrl = async (imageUrl: string): Promise<string> => {
  const reference = ref(
    storage,
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_URL + 'documents/' + imageUrl
  )
  const url = getDownloadURL(reference)
    .then((url) => {
      return url
    })
    .catch((err) => {
      console.log(err)
      return ''
    })
  return url
}
