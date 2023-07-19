import { doc, onSnapshot } from 'firebase/firestore'

import { User } from '@/common/models/user.type'
import { db } from '@/lib/firebase/config'

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
