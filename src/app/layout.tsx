import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Providers } from './providers'

const inter = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CryptoShield',
  description: 'Protect your asset and nft with the decentralized way',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
       <Providers>
        <Header />
          {children}
          <Footer />
       </Providers>
      </body>
    </html>
  )
}
