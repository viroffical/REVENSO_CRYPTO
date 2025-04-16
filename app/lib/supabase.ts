import { createClient } from '@supabase/supabase-js';

// Hard-code the values to avoid any environment variable loading issues
const supabaseUrl = 'https://rjucgbzerztofpuotjgr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqdWNnYnplcnp0b2ZwdW90amdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MzI2MTAsImV4cCI6MjA2MDIwODYxMH0.jf08hvHlAP5RAXqziUa8rytGR60xqRWnUAuhqfo-pek';

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function createClientSupabase() {
  return supabase;
}