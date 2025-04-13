import { useState } from 'react'
import dynamic from 'next/dynamic'

// Use dynamic import for CardStack to avoid SSR issues with animations
const CardStack = dynamic(() => import('../components/CardStack'), { ssr: false })
import BottomNavigation from '../components/BottomNavigation'
import { profiles } from '../data/profiles'

export default function Home() {
  const [activeTab, setActiveTab] = useState('people')
  
  return (
    <div className="app">
      <header className="app-header">
        <div className="menu-icon">
          <i className="fas fa-bars text-xl"></i>
        </div>
        <div className="logo">
          <h1 className="text-2xl font-bold">Bumble</h1>
        </div>
        <div className="settings-icon">
          <i className="fas fa-sliders-h text-xl"></i>
        </div>
      </header>
      
      <main className="app-content">
        {activeTab === 'people' && (
          <CardStack profiles={profiles} />
        )}
        {activeTab === 'profile' && (
          <div className="flex items-center justify-center h-full">
            <h2 className="text-2xl">Profile Section</h2>
          </div>
        )}
        {activeTab === 'likes' && (
          <div className="flex items-center justify-center h-full">
            <h2 className="text-2xl">Likes Section</h2>
          </div>
        )}
        {activeTab === 'chats' && (
          <div className="flex items-center justify-center h-full">
            <h2 className="text-2xl">Chats Section</h2>
          </div>
        )}
      </main>
      
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}