import { createClient } from '@supabase/supabase-js';

// We'll create the client lazily when needed
let supabaseClient = null;

// Hardcoded values for Replit environment
const SUPABASE_URL = 'https://rjucgbzerztofpuotjgr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqdWNnYnplcnp0b2ZwdW90amdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MzI2MTAsImV4cCI6MjA2MDIwODYxMH0.jf08hvHlAP5RAXqziUa8rytGR60xqRWnUAuhqfo-pek';

/**
 * Returns the Supabase client singleton, creating it if necessary.
 * This function ensures we only create the client when we have valid
 * URL and key values, and only create it once.
 */
export function getSupabaseClient() {
  // Return cached instance if we have one
  if (supabaseClient) {
    return supabaseClient;
  }

  try {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
    return supabaseClient;
  } catch (error) {
    console.error('Error creating Supabase client:', error);
    return null;
  }
}

// Legacy export for backwards compatibility
export default function supabase() {
  return getSupabaseClient();
}