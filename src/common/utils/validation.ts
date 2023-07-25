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

// カスタムフォーム画面のバリデーション
export const validateContentScreen = (
  title: string,
  content: string[]
): Validate => {
  if (!title) {
    return { isSuccess: false, message: 'タイトルを入力してください' }
  }
  if (content.length !== 0) {
    content.forEach((c) => {
      if (c === '') {
        return { isSuccess: false, message: '内容を入力してください' }
      }
    })
  }
  return { isSuccess: true, message: '' }
}
