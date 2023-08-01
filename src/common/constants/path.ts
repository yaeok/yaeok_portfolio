/** APIのエンドポイント */
export const API_PATH = {
  BROADCAST: process.env.NEXT_PUBLIC_DOMAIN + '/api/line/sent_broadcast',
  PUSHMESSAGE: process.env.NEXT_PUBLIC_DOMAIN + '/api/line/push_message',
  VISIONAPI: process.env.NEXT_PUBLIC_DOMAIN + '/api/gcp/vision',
}

/** ページ名・ルート名 */
export const INDEX = { path: '/', name: 'ルート' }
export const AUTH = { path: '/auth', name: 'ログイン画面' }
export const SIGNUP = { path: '/signup', name: '新規登録画面' }
export const HOME = { path: '/home', name: 'ホーム画面' }
/** ポートフォリオ */
export const PORTFOLIO = {
  path: '/portfolio',
  name: 'ポートフォリオ画面',
  type: '',
}
/** GCP関連 */
export const GCP_VISION_API = {
  path: '/gcp_vision_api',
  post: '/gcp_vision_api/post',
  detail: (id: string) => `/gcp_vision_api/${id}`,
  name: 'テキスト認識',
  type: 'GCP',
}
/** LINE関連 */
export const LINE_BROADCAST = {
  path: '/line_broadcast',
  name: 'Broadcast送信',
  type: 'LINE',
}
export const LINE_CONNECT = {
  path: '/line_login',
  name: 'ユーザ連携',
  type: 'LINE',
}
export const LINE_PUSHMESSAGE = {
  path: '/line_pushmessage',
  name: 'メッセージ送信',
  type: 'LINE',
}
/** API関連:Spring-Boot */
export const SPRING_BOOT_CONNECT = {
  path: '/spring_boot_connect',
  name: 'API連携',
  type: 'Spring-Boot',
}
/** Next.js × ChakraUI 標準的な開発 */
export const CUSTOMER_LIST = {
  path: '/customer',
  post: '/customer/post',
  name: 'お客さま一覧',
  type: '標準開発',
}

/** ホーム画面に表示するボタン */
export const SHOW_HOME = [
  PORTFOLIO,
  GCP_VISION_API,
  LINE_BROADCAST,
  LINE_CONNECT,
  LINE_PUSHMESSAGE,
  SPRING_BOOT_CONNECT,
  CUSTOMER_LIST,
]
