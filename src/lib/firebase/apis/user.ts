import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'

import { FirebaseResult } from '@/common/models/firebase_result.type'
import { User } from '@/common/models/user.type'
import { auth, db } from '@/lib/firebase/config'

/**
 * ユーザ情報の取得
 * @param uid
 */
export const getUserInfoByUid = async (args: { uid: string }) => {
  const docRef = doc(db, 'users', args.uid)
  return new Promise<User>((resolve, reject) => {
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.data()

          const user: User = {
            uid: userData.uid,
            username: userData.username,
            type: userData.type,
          }

          resolve(user)
        }
      },
      (error) => {
        reject(error)
      }
    )

    // 監視の解除を行う関数を返す
    return () => {
      unsubscribe()
    }
  })
}

/**
 * LINEのユーザ情報と紐付ける
 * @param lineId
 */
export const updateUserInfoByLineId = async (
  lineId: string
): Promise<FirebaseResult> => {
  let result = { isSuccess: false, message: '' }
  const uid = auth.currentUser?.uid!
  const docRef = doc(db, 'users', uid)
  await updateDoc(docRef, {
    lineId: lineId,
  })
    .then(() => {
      result = { isSuccess: true, message: 'LINEとの紐付けに成功しました' }
    })
    .catch((error) => {
      result = { isSuccess: false, message: error.message }
    })

  return result
}

/**
 * ログインユーザのLINE IDを取得する
 * @returns Promise<string>
 */
export const getLineIdByUid = async (): Promise<string> => {
  let result = ''
  const uid = auth.currentUser?.uid!
  const docRef = doc(db, 'users', uid)
  await getDoc(docRef).then((doc) => {
    if (doc.exists()) {
      const userData = doc.data()
      result = userData.lineId
    }
  })
  return result
}
