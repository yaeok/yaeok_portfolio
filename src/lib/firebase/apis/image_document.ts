import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore'

import { FirebaseResult } from '@/common/models/firebase_result.type'
import { ImageDocument } from '@/common/models/image_document'
import {
  getDocImageUrl,
  registerDocFromStorage,
} from '@/lib/firebase/apis/storage/image_document'
import { db } from '@/lib/firebase/config'

/**
 * ドキュメントの登録処理
 * @param name
 * @param file
 * @returns Promise<FirebaseResult>
 */
export const registerImageDocument = async (args: {
  imageName: string
  file: File[]
}): Promise<FirebaseResult> => {
  let result: FirebaseResult = { isSuccess: false, message: '' }
  const url = await registerDocFromStorage(args.file)
  const colRef = collection(db, 'documents')
  try {
    await addDoc(colRef, {
      imageName: args.imageName,
      imageUrl: url,
    })
    result = { isSuccess: true, message: '登録に成功しました' }
  } catch (error) {
    result = { isSuccess: false, message: '登録に失敗しました' }
  }

  return result
}

/**
 * 全ドキュメントの取得
 * @returns Promise<ImageDocument>
 */
export const getAllImageDocuments = async (): Promise<ImageDocument[]> => {
  const colRef = collection(db, 'documents')
  const snapshot = await getDocs(colRef)
  const documents = snapshot.docs.map((doc) => {
    const document: ImageDocument = {
      id: doc.id,
      imageName: doc.data().imageName,
      imageUrl: doc.data().imageUrl,
    }
    return document
  })
  return documents
}

/**
 * 単一ドキュメントの取得
 * @param id
 * @returns Promise<ImageDocument>
 */
export const getImageDocument = async (id: string): Promise<ImageDocument> => {
  let document: ImageDocument
  const docRef = doc(db, 'documents', id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    let imageUrl = ''
    if (docSnap.data().imageUrl) {
      imageUrl = await getDocImageUrl(docSnap.data().imageUrl)
    }
    document = {
      id: docSnap.id,
      imageName: docSnap.data().imageName,
      imageUrl: imageUrl,
      imageContent: docSnap.data().imageContent ?? '',
    }
  } else {
    document = {
      id: 'error',
      imageName: 'データが存在しません',
      imageUrl: '',
      imageContent: '',
    }
  }
  return document
}

/**
 * ドキュメントの更新
 * @param id
 * @param imageContent
 * @returns Promise<FirebaseResult>
 * */
export const updateImageDocument = async (args: {
  id: string
  imageContent: string
}): Promise<FirebaseResult> => {
  let result: FirebaseResult = { isSuccess: false, message: '' }
  const docRef = doc(db, 'documents', args.id)
  try {
    await updateDoc(docRef, {
      imageContent: args.imageContent,
    })
    result = { isSuccess: true, message: '更新に成功しました' }
  } catch (error) {
    result = { isSuccess: false, message: '更新に失敗しました' }
  }
  return result
}
