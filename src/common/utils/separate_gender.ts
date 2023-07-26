/** 性別を分ける */
export const separate_genders = (gender: number) => {
  switch (gender) {
    case 1:
      return '男性'
    case 2:
      return '女性'
    case 3:
      return 'その他'
    default:
      return 'その他'
  }
}
