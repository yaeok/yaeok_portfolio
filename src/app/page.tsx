'use client'
import { useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil'

import { AUTH, HOME } from '@/common/constants/path'
import { userState } from '@/common/states/user'

export default function NavScreen() {
  const user = useRecoilValue(userState)
  const router = useRouter()
  if (user) {
    router.replace(HOME.path)
  } else {
    router.replace(AUTH.path)
  }
}
