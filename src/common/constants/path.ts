/** APIのエンドポイント */
export const API_PATH = {
  BROADCAST: process.env.NEXT_PUBLIC_DOMAIN + '/api/line/sent_broadcast',
  PUSHMESSAGE: process.env.NEXT_PUBLIC_DOMAIN + '/api/line/push_message',
}

/** ページ名・ルート名 */
export const INDEX = { path: '/', name: 'index' }
export const AUTH = { path: '/auth', name: 'auth' }
export const HOME = { path: '/home', name: 'home' }
export const PORTFOLIO = { path: '/portfolio', name: 'ポートフォリオ' }
export const LINE_BROADCAST = {
  path: '/line_broadcast',
  name: 'LINE：Broadcast送信',
}
export const CONNECTED_SPRING_BOOT = {
  path: '/connected_spring_boot',
  name: 'Spring-Boot：API連携',
}
export const CUSTOMER_LIST = { path: '/customer', name: 'お客さま一覧' }
export const LINE_CONNECT = { path: '/line_login', name: 'LINE：ユーザ連携' }
export const LINE_PUSHMESSAGE = {
  path: '/line_pushmessage',
  name: 'LINE：メッセージ送信',
}

/** ホーム画面に表示するボタン */
export const SHOW_HOME = [
  PORTFOLIO,
  CONNECTED_SPRING_BOOT,
  LINE_BROADCAST,
  LINE_CONNECT,
  LINE_PUSHMESSAGE,
  CUSTOMER_LIST,
]
