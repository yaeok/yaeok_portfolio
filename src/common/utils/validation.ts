import { CustomerForm } from '@/common/models/customer.type'

// バリデーションタイプ
type Validate = {
  isSuccess: boolean
  message: string
}

// ログイン画面のバリデーション
export const validateLoginScreen = (
  email: string,
  password: string
): Validate => {
  if (!email) {
    return { isSuccess: false, message: 'メールアドレスを入力してください' }
  }
  if (!password) {
    return { isSuccess: false, message: 'パスワードを入力してください' }
  }
  return { isSuccess: true, message: '' }
}

// お客さま登録画面のバリデーション
export const validateCustomerPostForm = (customer: CustomerForm): Validate => {
  let result = { isSuccess: true, message: '' }
  if (!customer.lastName) {
    result = { isSuccess: false, message: '姓を入力してください' }
  }
  if (!customer.firstName) {
    result = { isSuccess: false, message: '名を入力してください' }
  }
  if (!customer.email) {
    result = { isSuccess: false, message: 'メールアドレスを入力してください' }
  }
  if (!customer.phoneNumber) {
    result = { isSuccess: false, message: '電話番号を入力してください' }
  }
  if (!customer.company) {
    result = { isSuccess: false, message: '会社名を入力してください' }
  }
  return result
}
