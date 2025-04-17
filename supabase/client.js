import { createClient } from '@supabase/supabase-js';

/**
 * Creates and returns a Supabase client
 * @returns {Object} Supabase client
 */
export function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase environment variables are missing');
    throw new Error('Supabase configuration is incomplete');
  }
  
  return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Singleton instance of Supabase client (for client-side usage)
 */
let supabaseInstance = null;

/**
 * Returns a singleton Supabase client instance
 * @returns {Object} Supabase client instance
 */
export function getSupabase() {
  if (typeof window === 'undefined') {
    // Server-side: create new instance each time
    return createSupabaseClient();
  }
  
  // Client-side: use singleton
  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient();
  }
  
  return supabaseInstance;
}

/**
 * Checks if a user is authenticated
 * @returns {Promise<boolean>} True if user is authenticated
 */
export async function isAuthenticated() {
  const supabase = getSupabase();
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}

/**
 * Gets the current user
 * @returns {Promise<Object|null>} User object or null
 */
export async function getCurrentUser() {
  const supabase = getSupabase();
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
}

/**
 * Gets user profile data including custom fields
 * @param {string} userId - User ID to fetch profile for
 * @returns {Promise<Object>} Combined user and profile data
 */
export async function getUserProfile(userId) {
  const supabase = getSupabase();
  
  // Get basic user data
  const { data: userData, error: userError } = await supabase
    .from('user')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (userError) {
    console.error('Error fetching user:', userError);
    throw userError;
  }
  
  // Get extended profile data
  const { data: profileData, error: profileError } = await supabase
    .from('profile_details')
    .select('*')
    .eq('user_id', userId)
    .single();
    
  if (profileError && !profileError.message.includes('No rows found')) {
    console.error('Error fetching profile:', profileError);
    throw profileError;
  }
  
  // Combine the data
  return {
    ...userData,
    profile: profileData || {}
  };
}