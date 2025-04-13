import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';

// Use dynamic import for components to avoid SSR issues with animations
const CardStack = dynamic(() => import('../components/CardStack'), { ssr: false })
const BottomNavigation = dynamic(() => import('../components/BottomNavigation'), { ssr: false })
const MeetingsComponent = dynamic(() => import('../components/MeetingsComponent'), { ssr: false })
const EventsComponent = dynamic(() => import('../components/EventsComponent'), { ssr: false })
const ChatsComponent = dynamic(() => import('../components/ChatsComponent'), { ssr: false })
const MapDetailComponent = dynamic(() => import('../components/MapDetailComponent'), { ssr: false })
const DashboardComponent = dynamic(() => import('../components/DashboardComponent'), { ssr: false })
const ProfileComponent = dynamic(() => import('../components/ProfileComponent'), { ssr: false })
const SideDrawer = dynamic(() => import('../components/SideDrawer'), { ssr: false })
import { profiles } from '../data/profiles'

export default function Home() {
  const [activeTab, setActiveTab] = useState('people');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Listen for custom events from the sidebar to switch tabs
  useEffect(() => {
    const handleSetActiveTab = (event) => {
      setActiveTab(event.detail);
    };
    
    window.addEventListener('setActiveTab', handleSetActiveTab);
    
    return () => {
      window.removeEventListener('setActiveTab', handleSetActiveTab);
    };
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'people':
        return <CardStack profiles={profiles} />;
      case 'maps':
        return <MapDetailComponent />;
      case 'meetings':
        return <MeetingsComponent />;
      case 'events':
        return <EventsComponent />;
      case 'chats':
        return <ChatsComponent />;
      case 'dashboard':
        return <DashboardComponent />;
      case 'profile':
        return <ProfileComponent userProfile={userProfile} />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-gray-500">This tab is under development</p>
          </div>
        );
    }
  };

  const userProfile = {
    name: 'Alex Johnson',
    username: '@alexj',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA',
    dateOfBirth: 'June 15, 1992',
    occupation: 'Senior Product Designer',
    bio: 'Creative designer with a passion for user experience and innovative solutions.',
    following: 196,
    followers: 1176,
    isPremium: true,
    role: 'Gold Member',
    profileImgUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    socialLinks: [
      { platform: 'Twitter', handle: '@alexjohnson' },
      { platform: 'LinkedIn', handle: 'alex-johnson' },
      { platform: 'Instagram', handle: '@alex.creates' }
    ]
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50 overflow-hidden relative">
      {/* Side Drawer */}
      <SideDrawer isOpen={drawerOpen} onClose={closeDrawer} userProfile={userProfile} />

      {/* Header - always showing the app name REVENSO */}
      <header className="flex justify-between items-center p-3 bg-white shadow-sm">
        <button className="p-2" onClick={toggleDrawer}>
          <FontAwesomeIcon icon={faBars} className="h-5 w-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-yellow-500">REVENSO</h1>
        </div>
        <button 
          className="p-2"
          onClick={() => setActiveTab('profile')}
        >
          <FontAwesomeIcon icon={faUserCircle} className="h-5 w-5 text-gray-600" />
        </button>
      </header>
      
      <main className="flex-1 overflow-hidden">
        {renderContent()}
      </main>
      
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}