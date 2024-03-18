import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Toaster } from 'react-hot-toast'
import { UserProvider } from '@auth0/nextjs-auth0/client'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trivia',
  description: 'Having Fun playing with good friends, it always a good moment in this life',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous" />
      </head>

      <UserProvider> 
        <body className={inter.className}>
          {children}
          <Toaster position='top-right' />
        </body>
      </UserProvider>
      
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous" />
    </html>
  )
}
