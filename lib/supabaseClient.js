import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks for local development/testing
const supabaseUrl = "https://rjucgbzerztofpuotjgr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqdWNnYnplcnp0b2ZwdW90amdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MzI2MTAsImV4cCI6MjA2MDIwODYxMH0.jf08hvHlAP5RAXqziUa8rytGR60xqRWnUAuhqfo-pek";


console.log(supabaseUrl)
console.log(supabaseAnonKey)
// Check that we have valid URLs and keys
const isValidUrl = (url) => {
  try {
    // If URL is empty, this will throw and we'll catch it
    new URL(url);
    return true;
  } catch (e) {
    console.error('Invalid Supabase URL:', e.message);
    return false;
  }
};

let supabase;

try {
  if (!supabaseUrl || !isValidUrl(supabaseUrl) || !supabaseAnonKey) {
    console.warn('Missing or invalid Supabase credentials. Some features may not work correctly.');
    // Create a mock client that will gracefully fail
    supabase = {
      from: () => ({
        select: () => Promise.resolve({ data: [], error: new Error('Supabase not configured') })
      })
    };
  } else {
    // Create the real client
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (error) {
  console.error('Error creating Supabase client:', error);
  // Create a safe fallback
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: new Error('Supabase client error') })
    })
  };
}

export { supabase };