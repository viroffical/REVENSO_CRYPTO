import { useState } from 'react'
import dynamic from 'next/dynamic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGear } from '@fortawesome/free-solid-svg-icons';

// Use dynamic import for CardStack to avoid SSR issues with animations
const CardStack = dynamic(() => import('../components/CardStack'), { ssr: false })
import { profiles } from '../data/profiles'

export default function Home() {
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
        <CardStack profiles={profiles} />
      </main>
    </div>
  )
}