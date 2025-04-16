import React from 'react'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'REVENSO - Connect at Events',
  description: 'Connect with industry professionals at events around the world',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  )
}