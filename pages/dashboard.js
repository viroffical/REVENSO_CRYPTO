import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { getSupabaseClient } from '../lib/supabaseClient';
import MeetingComponent from '../components/MeetingComponent';

export default function Dashboard() {
  const router = useRouter();
  const { calendly } = router.query;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    async function checkUser() {
      const supabase = getSupabaseClient();
      if (!supabase) return;

      const { data, error } = await supabase.auth.getUser();
      
      if (error || !data.user) {
        // Redirect to login if not authenticated
        router.push('/login');
        return;
      }
      
      setUser(data.user);
      setLoading(false);
    }
    
    checkUser();
  }, [router]);

  // Show notification when Calendly is connected
  useEffect(() => {
    if (calendly === 'connected') {
      setNotification('Calendly connected successfully!');
      
      // Clear the query parameter without full page reload
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
      
      // Hide notification after 3 seconds
      const timer = setTimeout(() => {
        setNotification('');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [calendly]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Dashboard - Calendly Integration</title>
      </Head>
      
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {notification}
        </div>
      )}
      
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Welcome, {user?.email}</h2>
            
            <div className="mt-8">
              <p className="text-gray-600 mb-4">Connect your Calendly account to manage meetings and scheduling.</p>
              
              {/* Include the Calendly component */}
              <MeetingComponent />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}