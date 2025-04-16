import React from 'react'
import Link from 'next/link'

export default function VerificationSentPage() {
  return (
    <div className="max-w-md w-full mx-auto text-center">
      <div className="mb-8">
        <svg
          className="h-16 w-16 text-yellow-500 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>
      
      <h1 className="text-2xl font-bold mb-4">Check your email</h1>
      
      <p className="text-gray-600 mb-6">
        We&apos;ve sent you a verification link to confirm your email address.
        Please check your inbox and click the link to complete your registration.
      </p>
      
      <p className="text-gray-600 mb-8">
        The email might take a few minutes to arrive. Be sure to check your spam folder.
      </p>
      
      <div className="space-y-4">
        <Link
          href="/auth/signin"
          className="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Return to Sign In
        </Link>
        
        <button
          onClick={() => window.location.reload()}
          className="block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Resend verification email
        </button>
      </div>
    </div>
  )
}