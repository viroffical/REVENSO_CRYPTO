import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

// Create the auth context
const AuthContext = createContext();

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Initialize and set up auth state listener
  useEffect(() => {
    // Get the initial session
    const initializeAuth = async () => {
      setLoading(true);
      
      // Check for active session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email,
          firstName: session.user.user_metadata?.first_name,
          lastName: session.user.user_metadata?.last_name,
          avatar_url: session.user.user_metadata?.avatar_url
        });
      }
      
      setLoading(false);
    };
    
    initializeAuth();
    
    // Set up listener for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.email,
            firstName: session.user.user_metadata?.first_name,
            lastName: session.user.user_metadata?.last_name,
            avatar_url: session.user.user_metadata?.avatar_url
          });
          setSuccess('Successfully logged in');
        }
        
        if (event === 'SIGNED_OUT') {
          setUser(null);
          setSuccess('Successfully logged out');
        }
      }
    );
    
    // Clean up subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login with email/password
  const login = async (email, password) => {
    setError('');
    setSuccess('');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        setError(error.message);
        return false;
      }
      
      // User is set by the auth state change listener
      return true;
    } catch (err) {
      setError('Login failed');
      return false;
    }
  };

  // Login with Google
  const signInWithGoogle = async () => {
    setError('');
    setSuccess('');
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        setError(error.message);
        return false;
      }
      
      return true;
    } catch (err) {
      setError('Google sign in failed');
      return false;
    }
  };

  // Register function
  const register = async (userData) => {
    setError('');
    setSuccess('');
    
    try {
      // Basic validation
      if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
        setError('All fields are required');
        return false;
      }
      
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            full_name: `${userData.firstName} ${userData.lastName}`
          }
        }
      });
      
      if (error) {
        setError(error.message);
        return false;
      }
      
      setSuccess('Account created successfully. Please check your email for confirmation.');
      return true;
    } catch (err) {
      setError('Registration failed');
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      setError(error.message);
    }
    // User is cleared by the auth state change listener
  };

  // Clear messages
  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const value = {
    user,
    loading,
    error,
    success,
    login,
    register,
    logout,
    signInWithGoogle,
    clearMessages
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext);
}