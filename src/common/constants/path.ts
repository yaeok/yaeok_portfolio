export const API_PATH = {
  SENDMESSAGE: process.env.NEXT_PUBLIC_DOMAIN + '/api/line/sendmessage',
  CONNECTEDLINE: process.env.NEXT_PUBLIC_DOMAIN + '/api/line/connected',
}
export const INDEX = { path: '/', name: 'index' }
export const AUTH = { path: '/auth', name: 'auth' }
export const HOME = { path: '/home', name: 'home' }
export const PORTFOLIO = { path: '/portfolio', name: 'ポートフォリオ' }
export const SEND_LINE_MESSAGE = {
  path: '/send_line_message',
  name: 'LINEメッセージ送信',
}

export const SHOW_HOME = [PORTFOLIO, SEND_LINE_MESSAGE]
