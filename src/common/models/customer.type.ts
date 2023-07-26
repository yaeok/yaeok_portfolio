/** DB取得用 */
export type CustomerGet = {
  id: string
  lastName: string
  firstName: string
  gender: string
  email: string
  phoneNumber: string
  company: string
  counter: number
  content: string
}

/** 入力フォーム用 */
export type CustomerForm = {
  formId: number
  lastName: string
  firstName: string
  gender: number
  email: string
  phoneNumber: string
  company: string
  content: string
}

/** DB格納用 */
export type CustomerPost = {
  lastName: string
  firstName: string
  gender: number
  email: string
  phoneNumber: string
  company: string
  counter: number
  content: string
}
