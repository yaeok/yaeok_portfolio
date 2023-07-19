import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'message-recoil-persist',
  storage: typeof window === 'undefined' ? undefined : sessionStorage,
})

export const messageState = atom<boolean>({
  key: 'message-state',
  default: false,
  effects_UNSTABLE: [persistAtom],
})
