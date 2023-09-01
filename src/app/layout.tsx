import styles from '@/app/globals.module.css';
import { AuthContextProvider } from '@/common/providers/auth_provider';
import Provider from '@/common/providers/provider';

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'やっぴの備忘録',
  description: '南国のエンジニアの備忘録です',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ja'>
      <body className={styles.body}>
        <Provider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </Provider>
      </body>
    </html>
  )
}
