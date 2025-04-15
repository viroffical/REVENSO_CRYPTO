import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMoon, 
  faSun, 
  faEnvelope, 
  faUser, 
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  // Get auth and theme contexts with client-side only
  const auth = useAuth ? useAuth() : { user: null, logout: () => {}, loading: true };
  const theme = useTheme ? useTheme() : { darkMode: false, toggleDarkMode: () => {} };
  
  // Handle SSR issues and client-side redirects
  useEffect(() => {
    setMounted(true);
    
    // Redirect if not logged in (client-side only)
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (!user) {
        router.push('/');
      }
    }
  }, [router]);
  
  // Show loading state if not mounted yet
  if (!mounted || auth.loading || !auth.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 bg-yellow-400 rounded-full">
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard | REVENSO</title>
      </Head>
      <div className="min-h-screen">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">REVENSO</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={theme.toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
                aria-label="Toggle Dark Mode"
              >
                <FontAwesomeIcon 
                  icon={theme.darkMode ? faSun : faMoon} 
                  className="text-black dark:text-yellow-300"
                />
              </button>
              <button
                onClick={auth.logout}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-red-500"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="card p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-32 h-32 relative mb-6 md:mb-0 md:mr-8">
                <Image 
                  src={auth.user.avatar || '/avatar-placeholder.svg'} 
                  alt="User avatar"
                  className="rounded-full border-4 border-yellow-400"
                  width={128}
                  height={128}
                  priority
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Welcome back, {auth.user.name}!
                </h2>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  <span>{auth.user.name}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  <span>{auth.user.email}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
              <h3 className="text-xl font-semibold mb-4">
                Dashboard Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow">
                  <h4 className="font-medium mb-2">Account Status</h4>
                  <p className="text-xl font-semibold text-green-500">Active</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow">
                  <h4 className="font-medium mb-2">Last Login</h4>
                  <p className="text-xl font-semibold">Today</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow">
                  <h4 className="font-medium mb-2">Account Type</h4>
                  <p className="text-xl font-semibold text-yellow-500">Premium</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={auth.logout}
                className="btn-primary flex items-center"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}