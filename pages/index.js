import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';

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
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
 
  
  const router = useRouter();

  // Check client-side mounting and authentication
  useEffect(() => {
    setMounted(true);
    
    // Check if user is authenticated
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('revenso_user');
        if (!userData) {
          router.push('/login');
          return;
        }
        
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);

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
    // Clear user data from localStorage
    localStorage.removeItem('revenso_user');
    
    // Redirect to login page
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

  // Create a user profile from user data
  const userProfile = user ? {
    name: user.full_name || 'User',
    username: `@${user.twitter?.replace('@', '') || 'user'}`,
    email: user.email,
    avatar: user.avatar || 'https://via.placeholder.com/150',
    role: user.profile?.role || 'Member',
    project: user.profile?.project || '',
    bio: user.profile?.description || 'No bio available',
    event: user.profile?.event_attending || 'No events',
    // Default values for remaining fields
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA',
    following: 196,
    followers: 1176,
    isPremium: true,
    socialLinks: [
      { platform: 'Twitter', handle: user.twitter || '@user' }
    ]
  } : null;

  // Show loading state or login redirect
  if (isLoading || !mounted) {
    return <div className="loading-screen">Loading...</div>;
  }
  
  // If not authenticated, don't render anything (redirect will handle navigation)
  if (!isAuthenticated) {
    return <div className="loading-screen">Redirecting to login...</div>;
  }

  // Main app content when authenticated
  return (
    <>
      <Head>
        <title>REVENSO | Connect with Professionals</title>
      </Head>
      
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
}