import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'iMusician - Sign Up',
  description: 'Join iMusician and start your music journey today',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 