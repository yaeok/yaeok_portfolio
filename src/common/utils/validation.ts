export const validateLoginScreen = (
  email: string,
  password: string
): string => {
  if (!email) {
    return 'メールアドレスを入力してください'
  }
  if (!password) {
    return 'パスワードを入力してください'
  }
  return ''
}
