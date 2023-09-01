'use client'
import { Container } from '@/common/design';

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <Container
      as='main'
      maxW='container.xl'
      py={{ base: 4 }}
      minH='calc(100vh - 115px)'
    >
      {children}
    </Container>
  )
}
