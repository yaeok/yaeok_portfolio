'use client'
import { Container } from '@/common/design'

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <Container
      as='main'
      bg='blackAlpha.200'
      maxW='container.xl'
      py={{ base: 4 }}
      minH='calc(100vh - 125px)'
    >
      {children}
    </Container>
  )
}
