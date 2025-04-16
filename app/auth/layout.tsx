import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication - REVENSO',
  description: 'Sign in or create an account to join REVENSO',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full bg-yellow-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">R</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}