import { createClient } from '@supabase/supabase-js';

// Create a server-side Supabase client
const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rjucgbzerztofpuotjgr.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqdWNnYnplcnp0b2ZwdW90amdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MzI2MTAsImV4cCI6MjA2MDIwODYxMH0.jf08hvHlAP5RAXqziUa8rytGR60xqRWnUAuhqfo-pek";
  
  return createClient(supabaseUrl, supabaseAnonKey);
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed, please use POST' });
  }

  try {
    const { email, password, fullName, twitter, role, project, bio, event } = req.body;

    // Validate required fields
    if (!email || !password || !fullName) {
      return res.status(400).json({ error: 'Email, password, and full name are required' });
    }

    const supabase = createServerSupabaseClient();

    // Register the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          twitter,
          role,
          project,
          bio,
          event
        }
      }
    });

    if (authError) {
      console.error('Authentication error:', authError);
      return res.status(400).json({ error: authError.message });
    }

    // If we get here, user was created successfully
    return res.status(200).json({
      message: 'User registered successfully',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        fullName
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Server error during registration' });
  }
}