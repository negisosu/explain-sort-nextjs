// app/providers.tsx
'use client'

import { HeroUIProvider } from '@heroui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </HeroUIProvider>
  )
}