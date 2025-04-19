import { useState, useEffect, createContext, useContext } from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import { getSupabaseClient } from '../lib/supabaseClient';

// Create Auth Context
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Auth Provider Component
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [supabase, setSupabase] = useState(null);

  // Initialize Supabase client and auth listener
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    
    const supabaseInstance = getSupabaseClient();
    if (!supabaseInstance) return;

    setSupabase(supabaseInstance);
    
    // Set initial user
    supabaseInstance.auth.getUser().then(({ data, error }) => {
      if (!error && data?.user) {
        setUser(data.user);
      }
      setLoading(false);
    });
    
    // Listen for auth changes
    const { data: authListener } = supabaseInstance.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );
    
    // Cleanup
    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // Auth values to be provided
  const value = {
    user,
    loading,
    supabase,
    signIn: async (email, password) => {
      if (!supabase) return { error: 'Supabase client not initialized' };
      return supabase.auth.signInWithPassword({ email, password });
    },
    signUp: async (email, password, userData) => {
      if (!supabase) return { error: 'Supabase client not initialized' };
      return supabase.auth.signUp({ 
        email, 
        password,
        options: { data: userData }
      });
    },
    signOut: async () => {
      if (!supabase) return { error: 'Supabase client not initialized' };
      return supabase.auth.signOut();
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Calendly Integration App</title>
        <meta name="description" content="Connect your Calendly account with our app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;