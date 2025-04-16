import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_URL || req.headers.origin}/`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    });

    if (error) {
      console.error('Google OAuth error:', error);
      return res.status(400).json({ error: error.message });
    }

    // Redirect to Supabase OAuth URL
    return res.redirect(302, data.url);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Authentication service error' });
  }
}