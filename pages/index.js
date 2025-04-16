import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

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
  const [mounted, setMounted] = useState(false);
  
  const router = useRouter();
  const { user, logout } = useAuth();

  // Check client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Listen for custom events from the sidebar to switch tabs
  useEffect(() => {
    if (!mounted) return;
    
    const handleSetActiveTab = (event) => {
      setActiveTab(event.detail);
    };
    
    window.addEventListener('setActiveTab', handleSetActiveTab);
    
    return () => {
      window.removeEventListener('setActiveTab', handleSetActiveTab);
    };
  }, [mounted]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  
  const handleLogout = () => {
    logout();
    router.push('/login');
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

  // Create a user profile from auth data
  const userProfile = user ? {
    name: user.name || `${user.firstName} ${user.lastName}`,
    username: `@${user.firstName?.toLowerCase() || ''}${user.lastName?.charAt(0)?.toLowerCase() || ''}`,
    email: user.email,
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
  } : null;

  // Main app content
  const AppContent = () => {
    if (!mounted) {
      return <div className="loading-screen">Loading...</div>;
    }
    
    return (
      <>
        <div className="relative flex flex-col h-screen max-w-md mx-auto bg-white overflow-hidden">
          {/* Side Drawer */}
          <SideDrawer isOpen={drawerOpen} onClose={closeDrawer} userProfile={userProfile} />

          {/* Header - always showing the app name REVENSO */}
          <header className="flex justify-between items-center p-3 bg-white shadow-sm z-10 sticky top-0">
            <button className="p-2 touch-manipulation" onClick={toggleDrawer}>
              <FontAwesomeIcon icon={faBars} className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-black-500">REVENSO</h1>
            </div>
            <button 
              className="p-2 touch-manipulation"
              onClick={handleLogout}
              title="Logout"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5 text-gray-600" />
            </button>
          </header>
          
          {/* Main content area */}
          <main className="flex-1 overflow-hidden pb-32">
            {renderContent()}
          </main>
        </div>
        
        {/* Bottom navigation - rendered outside the main container to ensure it's always on top */}
        <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <style jsx>{`
          .loading-screen {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </>
    );
  };

  // Wrap the app content with the protected route
  return (
    <ProtectedRoute>
      <AppContent />
    </ProtectedRoute>
  );
}