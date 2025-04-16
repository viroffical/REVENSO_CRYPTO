import React from 'react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="h-20 w-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-3xl">R</span>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-2">REVENSO</h1>
        <p className="text-xl text-gray-600 mb-8">
          Connect with industry professionals at events around the world
        </p>
        
        <div className="space-y-4">
          <Link
            href="/auth/signin"
            className="block w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Sign In
          </Link>
          
          <Link
            href="/auth/signup"
            className="block w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Create Account
          </Link>
        </div>
        
        <p className="mt-8 text-sm text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}