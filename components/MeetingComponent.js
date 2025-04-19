import { useState, useEffect } from 'react';
import { getSupabaseClient } from '../lib/supabaseClient';

const MeetingComponent = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Check if user is authenticated and if Calendly is connected
  useEffect(() => {
    async function checkConnection() {
      try {
        setLoading(true);
        setError(null);
        
        const supabase = getSupabaseClient();
        if (!supabase) {
          throw new Error('Failed to initialize Supabase client');
        }
        
        // Get authenticated user
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        if (userError || !userData.user) {
          throw new Error('User not authenticated');
        }
        
        setUser(userData.user);
        
        // Check if user has Calendly connection
        const { data: connectionData, error: connectionError } = await supabase
          .from('calendly_connections')
          .select('*')
          .eq('user_id', userData.user.id)
          .single();
        
        if (connectionError && connectionError.code !== 'PGRST116') {
          throw new Error('Failed to check Calendly connection');
        }
        
        setIsConnected(!!connectionData);
      } catch (error) {
        console.error('Error checking Calendly connection:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    
    checkConnection();
  }, []);

  // Handle connect button click
  const handleConnect = () => {
    window.location.href = '/api/auth/calendly';
  };

  // Handle disconnect button click
  const handleDisconnect = async () => {
    try {
      setLoading(true);
      
      const supabase = getSupabaseClient();
      if (!supabase || !user) {
        throw new Error('No authenticated user or Supabase client');
      }
      
      // Delete the Calendly connection
      const { error } = await supabase
        .from('calendly_connections')
        .delete()
        .eq('user_id', user.id);
      
      if (error) {
        throw new Error('Failed to disconnect Calendly');
      }
      
      setIsConnected(false);
    } catch (error) {
      console.error('Error disconnecting Calendly:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex justify-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Calendly Integration</h2>
      
      {isConnected ? (
        <div>
          <div className="flex items-center text-green-500 mb-4">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Connected to Calendly</span>
          </div>
          
          <p className="text-gray-600 mb-4">
            Your Calendly account is connected. You can now manage your meetings and schedule through this app.
          </p>
          
          <button
            onClick={handleDisconnect}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Disconnect Calendly
          </button>
        </div>
      ) : (
        <div>
          <p className="text-gray-600 mb-4">
            Connect your Calendly account to manage your meetings and schedule directly from this app.
          </p>
          
          <button
            onClick={handleConnect}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Connect with Calendly
          </button>
        </div>
      )}
    </div>
  );
};

export default MeetingComponent;