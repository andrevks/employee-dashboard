import { Providers } from '@/components/Providers'
import "@/styles/globals.css"

import { fonts } from '../components/fonts'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={fonts.outfit.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
