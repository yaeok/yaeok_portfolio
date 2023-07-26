import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'

import { AuthResult } from '@/common/models/auth.type'
import { auth, db } from '@/lib/firebase/config'
import liff from '@line/liff'

type FirebaseError = {
  code: string
  message: string
  name: string
}

const isFirebaseError = (e: Error): e is FirebaseError => {
  return 'code' in e && 'message' in e
}

/**
 * ログイン処理
 * @param email
 * @param password
 */
export const signInWithEmail = async (args: {
  email: string
  password: string
}): Promise<AuthResult> => {
  let result: AuthResult = { isSuccess: false, message: '' }
  try {
    const user = await signInWithEmailAndPassword(
      auth,
      args.email,
      args.password
    ).then((userCredential) => {
      const docRef = doc(db, 'users', userCredential.user.uid)
      updateDoc(docRef, {
        uid: userCredential.user.uid,
        username: userCredential.user.email?.split('@')[0],
        login_at: serverTimestamp(),
      })
      return userCredential.user
    })

    if (user) {
      result = { isSuccess: true, message: 'ログインに成功しました' }
    }
  } catch (error) {
    if (
      error instanceof Error &&
      isFirebaseError(error) &&
      error.code === 'auth/user-not-found'
    ) {
      result = { isSuccess: false, message: 'ユーザが見つかりませんでした' }
    } else if (
      error instanceof Error &&
      isFirebaseError(error) &&
      error.code === 'auth/wrong-password'
    ) {
      result = { isSuccess: false, message: 'パスワードが間違っています' }
    } else {
      result = { isSuccess: false, message: 'ログインに失敗しました' }
    }
  }
  return result
}

/**
 * ログアウト処理
 */
export const logout = async (): Promise<AuthResult> => {
  let result: AuthResult = { isSuccess: false, message: '' }

  await signOut(auth)
    .then(() => {
      result = { isSuccess: true, message: 'ログアウトしました' }
    })
    .catch((error) => {
      result = { isSuccess: false, message: error.message }
    })

  return result
}
