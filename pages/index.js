import { useState } from 'react'
import dynamic from 'next/dynamic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';

// Use dynamic import for CardStack to avoid SSR issues with animations
const CardStack = dynamic(() => import('../components/CardStack'), { ssr: false })
import { profiles } from '../data/profiles'

export default function Home() {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50 overflow-hidden">
      <header className="flex justify-between items-center p-3 bg-white shadow-sm">
        <button className="p-2">
          <FontAwesomeIcon icon={faBars} className="h-5 w-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Bumble</h1>
        </div>
        <button className="p-2">
          <FontAwesomeIcon icon={faUserCircle} className="h-5 w-5 text-gray-600" />
        </button>
      </header>
      
      <main className="flex-1 overflow-hidden">
        <CardStack profiles={profiles} />
      </main>
    </div>
  )
}