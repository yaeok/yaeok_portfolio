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
export const validateCustomerPostForm = (
  customers: CustomerForm[]
): Validate => {
  let result = { isSuccess: true, message: '' }
  customers.forEach((customer) => {
    if (!customer.lastName) {
      result = {
        isSuccess: false,
        message: `${customer.formId}：姓を入力してください`,
      }
      return result
    }
    if (!customer.firstName) {
      result = {
        isSuccess: false,
        message: `${customer.formId}：名を入力してください`,
      }
      return result
    }
    if (!customer.email) {
      result = {
        isSuccess: false,
        message: `${customer.formId}：メールアドレスを入力してください`,
      }
      return result
    }
    if (!customer.phoneNumber) {
      result = {
        isSuccess: false,
        message: `${customer.formId}：電話番号を入力してください`,
      }
      return result
    }
    if (!customer.company) {
      result = {
        isSuccess: false,
        message: `${customer.formId}：会社名を入力してください`,
      }
      return result
    }
  })
  return result
}
