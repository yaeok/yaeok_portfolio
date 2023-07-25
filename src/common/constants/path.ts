/** APIのエンドポイント */
export const API_PATH = {
  SENDMESSAGE: process.env.NEXT_PUBLIC_DOMAIN + '/api/line/sendmessage',
  CONNECTEDLINE: process.env.NEXT_PUBLIC_DOMAIN + '/api/line/connected',
  PUSH: process.env.NEXT_PUBLIC_DOMAIN + '/api/line/push',
}

/** ページ名・ルート名 */
export const INDEX = { path: '/', name: 'index' }
export const AUTH = { path: '/auth', name: 'auth' }
export const HOME = { path: '/home', name: 'home' }
export const PORTFOLIO = { path: '/portfolio', name: 'ポートフォリオ' }
export const SEND_LINE_MESSAGE = {
  path: '/send_line_message',
  name: 'LINEメッセージ送信',
}
export const CONNECTED_SPRING_BOOT = {
  path: '/connected_spring_boot',
  name: 'SpringBoot連携',
}
export const CONNECTED_LINE = { path: '/connected_line', name: 'LINE連携' }

/** ホーム画面に表示するボタン */
export const SHOW_HOME = [
  PORTFOLIO,
  SEND_LINE_MESSAGE,
  CONNECTED_LINE,
  CONNECTED_SPRING_BOOT,
]
