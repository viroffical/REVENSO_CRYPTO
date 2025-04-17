import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Auth with Supabase Auth first
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      console.error('Authentication error:', authError);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Fetch user data from the user table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (userError) {
      console.error('User fetch error:', userError);
      return res.status(500).json({ error: 'Error fetching user data' });
    }

    // Fetch profile details from the profile_details table
    const { data: profileData, error: profileError } = await supabase
      .from('profile_detail')
      .select('*')
      .eq('user_id', userData.id)
      .single();

    // Return user data with profile
    const userWithProfile = {
      ...userData,
      profile: profileError ? null : profileData,
      auth: {
        accessToken: authData.session.access_token,
        refreshToken: authData.session.refresh_token
      }
    };

    // Success response with user data
    return res.status(200).json({
      success: true,
      user: userWithProfile
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error during login' });
  }
}