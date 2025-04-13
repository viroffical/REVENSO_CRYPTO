import { useState } from 'react'
import dynamic from 'next/dynamic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';

// Use dynamic import for components to avoid SSR issues with animations
const CardStack = dynamic(() => import('../components/CardStack'), { ssr: false })
const BottomNavigation = dynamic(() => import('../components/BottomNavigation'), { ssr: false })
const MeetingsComponent = dynamic(() => import('../components/MeetingsComponent'), { ssr: false })
const EventsComponent = dynamic(() => import('../components/EventsComponent'), { ssr: false })
import { profiles } from '../data/profiles'

export default function Home() {
  const [activeTab, setActiveTab] = useState('people');

  const renderContent = () => {
    switch (activeTab) {
      case 'people':
        return <CardStack profiles={profiles} />;
      case 'meetings':
        return <MeetingsComponent />;
      case 'events':
        return <EventsComponent />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-gray-500">This tab is under development</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50 overflow-hidden">
      {activeTab === 'people' && (
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
      )}
      
      <main className="flex-1 overflow-hidden">
        {renderContent()}
      </main>
      
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}