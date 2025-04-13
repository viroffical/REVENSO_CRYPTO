import { useState } from 'react'
import dynamic from 'next/dynamic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSliders, faGear } from '@fortawesome/free-solid-svg-icons';

// Use dynamic import for CardStack to avoid SSR issues with animations
const CardStack = dynamic(() => import('../components/CardStack'), { ssr: false })
import BottomNavigation from '../components/BottomNavigation'
import { profiles } from '../data/profiles'

export default function Home() {
  const [activeTab, setActiveTab] = useState('people')
  
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50 overflow-hidden">
      <header className="flex justify-between items-center p-4 bg-white shadow-sm">
        <button className="p-2">
          <FontAwesomeIcon icon={faBars} className="h-6 w-6 text-gray-500" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-yellow-500">Bumble</h1>
        </div>
        <button className="p-2">
          <FontAwesomeIcon icon={faGear} className="h-6 w-6 text-gray-500" />
        </button>
      </header>
      
      <main className="flex-1 overflow-hidden">
        {activeTab === 'people' && (
          <CardStack profiles={profiles} />
        )}
        {activeTab === 'profile' && (
          <div className="flex items-center justify-center h-full bg-white">
            <h2 className="text-2xl font-semibold text-gray-700">Profile Section</h2>
          </div>
        )}
        {activeTab === 'likes' && (
          <div className="flex items-center justify-center h-full bg-white">
            <h2 className="text-2xl font-semibold text-gray-700">Likes Section</h2>
          </div>
        )}
        {activeTab === 'chats' && (
          <div className="flex items-center justify-center h-full bg-white">
            <h2 className="text-2xl font-semibold text-gray-700">Chats Section</h2>
          </div>
        )}
      </main>
      
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}