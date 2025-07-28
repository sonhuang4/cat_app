import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'CatBox - Premium Cat Subscription Box',
  description: 'Get premium cat litter and food delivered to your door. Tailored for your feline friend.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}