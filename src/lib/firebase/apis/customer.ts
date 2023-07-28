import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'

import {
  CustomerForm,
  CustomerGet,
  CustomerPost,
} from '@/common/models/customer.type'
import { FirebaseResult } from '@/common/models/firebase_result.type'
import { separate_genders } from '@/common/utils/separate_gender'
import { db } from '@/lib/firebase/config'

/**
 * お客さま情報を登録
 * @param customers
 */
export const registerCustomer = async (
  customers: CustomerForm[]
): Promise<FirebaseResult> => {
  let result = { isSuccess: false, message: '' }
  const colRef = collection(db, 'customers')
  await Promise.all(
    customers.map(async (customer) => {
      /** DB格納用の型に変換 */
      const postCustomer: CustomerPost = {
        lastName: customer.lastName,
        firstName: customer.firstName,
        gender: customer.gender,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        company: customer.company,
        counter: 0,
        content: customer.content,
      }
      await addDoc(colRef, postCustomer)
        .then(async (docRef) => {
          await updateDoc(docRef, {
            id: docRef.id,
            createdAt: serverTimestamp(),
            deleteFlg: false,
          }).then(() => {
            result = { isSuccess: true, message: '正常に登録されました' }
          })
        })
        .catch((error) => {
          result = { isSuccess: false, message: error.message }
        })
    })
  )
  return result
}

/**
 * 全てのお客さま情報を取得
 * @returns customers
 */
export const getAllCustomers = async () => {
  const colRef = collection(db, 'customers')
  const q = query(colRef, where('deleteFlg', '==', false), orderBy('createdAt'))
  const snapshot = await getDocs(colRef)
  const customers = snapshot.docs.map((doc) => {
    const customer: CustomerGet = {
      id: doc.id,
      lastName: doc.data().lastName,
      firstName: doc.data().firstName,
      gender: separate_genders(Number.parseInt(doc.data().gender)),
      email: doc.data().email,
      phoneNumber: doc.data().phoneNumber,
      company: doc.data().company,
      counter: doc.data().counter,
      content: doc.data().content,
    }
    return customer
  })
  return customers
}

/**
 * 来店回数のカウントアップ
 * @param id
 * @param afterCounter
 */
export const updateCountUp = async (args: {
  id: string
  afterCounter: number
}): Promise<FirebaseResult> => {
  let result = { isSuccess: false, message: '' }
  const docRef = doc(db, 'customers', args.id)
  await updateDoc(docRef, { counter: args.afterCounter }).then(() => {
    result = { isSuccess: true, message: '' }
  })
  return result
}
