import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'

import { auth, db } from '@/lib/firebase/config'

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
}): Promise<{ result: boolean; message: string }> => {
  let result = { result: false, message: 'ログインに失敗しました' }
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
      result = { result: true, message: 'ログインに成功しました' }
    }
  } catch (error) {
    if (
      error instanceof Error &&
      isFirebaseError(error) &&
      error.code === 'auth/user-not-found'
    ) {
      result = { result: false, message: 'ユーザが見つかりませんでした' }
    } else if (
      error instanceof Error &&
      isFirebaseError(error) &&
      error.code === 'auth/wrong-password'
    ) {
      result = { result: false, message: 'パスワードが間違っています' }
    } else {
      result = { result: false, message: 'ログインに失敗しました' }
    }
  }
  return result
}

/**
 * ログアウト処理
 */
export const logout = async () => {
  await signOut(auth)
    .then(() => {
      console.log('ログアウトしました')
    })
    .catch((error) => {
      console.log(`ログアウト時にエラーが発生しました (${error})`)
    })
}
