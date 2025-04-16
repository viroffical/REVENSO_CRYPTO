'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faHome, 
  faUser, 
  faCalendarAlt, 
  faComments, 
  faMapMarkerAlt, 
  faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons'
import { createClient } from '../../utils/supabase/client'
import { signout } from '../../lib/auth-actions'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('home')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.auth.getUser()
      
      if (error || !data?.user) {
        // Not authenticated, redirect to login
        router.push('/auth/signin')
        return
      }
      
      setUser(data.user)
      setLoading(false)
    }
    
    fetchUser()
  }, [router])
  
  const handleLogout = async () => {
    try {
      await signout()
      toast.success('Signed out successfully')
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error('Failed to sign out')
    }
  }
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mx-auto"></div>
          </div>
          <h1 className="text-2xl font-bold">REVENSO</h1>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top bar */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <h1 className="ml-3 text-xl font-bold text-gray-900">REVENSO</h1>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Welcome to your dashboard</h2>
            <p className="mt-2 text-gray-600">
              You are signed in as {user.email}
            </p>
          </div>
          
          <div className="mt-8">
            <p className="text-gray-700 text-center">
              This page is a placeholder for your dashboard content.
              The full REVENSO app is under development.
            </p>
          </div>
        </div>
      </main>
      
      {/* Bottom navigation */}
      <nav className="bg-white border-t border-gray-200 fixed bottom-0 inset-x-0">
        <div className="max-w-md mx-auto px-4">
          <div className="flex justify-between">
            <button 
              onClick={() => setActiveTab('home')}
              className={`py-4 px-6 ${activeTab === 'home' ? 'text-yellow-500' : 'text-gray-500'}`}
            >
              <FontAwesomeIcon icon={faHome} className="h-6 w-6" />
            </button>
            
            <button 
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-6 ${activeTab === 'profile' ? 'text-yellow-500' : 'text-gray-500'}`}
            >
              <FontAwesomeIcon icon={faUser} className="h-6 w-6" />
            </button>
            
            <button 
              onClick={() => setActiveTab('events')}
              className={`py-4 px-6 ${activeTab === 'events' ? 'text-yellow-500' : 'text-gray-500'}`}
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="h-6 w-6" />
            </button>
            
            <button 
              onClick={() => setActiveTab('chats')}
              className={`py-4 px-6 ${activeTab === 'chats' ? 'text-yellow-500' : 'text-gray-500'}`}
            >
              <FontAwesomeIcon icon={faComments} className="h-6 w-6" />
            </button>
            
            <button 
              onClick={() => setActiveTab('map')}
              className={`py-4 px-6 ${activeTab === 'map' ? 'text-yellow-500' : 'text-gray-500'}`}
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
      
      {/* Extra padding at the bottom to account for the fixed navigation */}
      <div className="h-16"></div>
    </div>
  )
}