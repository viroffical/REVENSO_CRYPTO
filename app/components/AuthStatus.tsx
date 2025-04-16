'use client';

import { useCallback, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClientSupabase } from '../lib/supabase';

export default function AuthStatus() {
  const router = useRouter();
  const supabase = createClientSupabase();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the user data
  const getUser = useCallback(async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  }, [supabase.auth]);

  // Handle signout
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.refresh();
      router.push('/auth/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (event === 'SIGNED_OUT') {
          router.refresh();
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth, router, getUser]);

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded-full bg-gray-300 animate-pulse"></div>
        <span className="text-sm text-gray-500">Loading...</span>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm">Hello, {user.email?.split('@')[0] || 'User'}</span>
        <div className="relative group">
          <button 
            className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <span>Account</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-10">
            <Link 
              href="/dashboard" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </Link>
            <Link 
              href="/onboarding" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </Link>
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/auth/login"
        className="text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        Sign in
      </Link>
      <Link
        href="/auth/signup"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
      >
        Sign up
      </Link>
    </div>
  );
}