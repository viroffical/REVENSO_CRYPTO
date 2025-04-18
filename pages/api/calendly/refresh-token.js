import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role key for admin privileges
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Calendly OAuth settings
const CALENDLY_CLIENT_ID = process.env.CALENDLY_CLIENT_ID;
const CALENDLY_CLIENT_SECRET = process.env.CALENDLY_CLIENT_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get user ID from the request
  const { user } = await supabase.auth.getUser(req.cookies['sb-access-token'] || req.cookies['sb:token']);
  
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    // 1. Get the refresh token from the database
    const { data: userData, error: userError } = await supabase
      .from('calendly_users')
      .select('refresh_token')
      .eq('user_id', user.id)
      .single();

    if (userError || !userData) {
      console.error('Failed to get refresh token:', userError);
      return res.status(404).json({ error: 'Calendly connection not found' });
    }

    const { refresh_token } = userData;

    // 2. Use the refresh token to get a new access token
    const tokenResponse = await fetch('https://auth.calendly.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CALENDLY_CLIENT_ID,
        client_secret: CALENDLY_CLIENT_SECRET,
        refresh_token,
        grant_type: 'refresh_token',
      }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error('Failed to refresh token:', error);
      return res.status(401).json({ error: 'Failed to refresh token' });
    }

    const tokenData = await tokenResponse.json();
    const { access_token, refresh_token: new_refresh_token, expires_in } = tokenData;

    // 3. Calculate token expiration
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + expires_in);

    // 4. Update the tokens in the database
    const { error: updateError } = await supabase
      .from('calendly_users')
      .update({
        access_token,
        refresh_token: new_refresh_token,
        token_expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id);

    if (updateError) {
      console.error('Failed to update tokens:', updateError);
      return res.status(500).json({ error: 'Failed to update tokens' });
    }

    // 5. Return success
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error refreshing Calendly token:', error);
    res.status(500).json({ error: 'Server error' });
  }
}