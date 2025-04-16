'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { signInWithGoogle } from '../../lib/auth-actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

export default function SignInWithGoogleButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  
  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    
    try {
      const { error } = await signInWithGoogle()
      
      if (error) {
        toast.error(error)
      }
    } catch (error) {
      console.error('Error during Google sign in:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <FontAwesomeIcon icon={faGoogle} className="h-5 w-5 mr-2" />
      {isLoading ? 'Connecting...' : 'Continue with Google'}
    </button>
  )
}