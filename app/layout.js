import './globals.css'

export const metadata = {
  title: 'iMusician - Sign Up',
  description: 'Join iMusician and start your music journey today',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 