import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role key for admin privileges
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Calendly OAuth settings
const CALENDLY_CLIENT_ID = process.env.CALENDLY_CLIENT_ID;
const CALENDLY_CLIENT_SECRET = process.env.CALENDLY_CLIENT_SECRET;
const CALENDLY_REDIRECT_URI = process.env.CALENDLY_REDIRECT_URI || 
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/calendly/callback`;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.query;
  const returnUrl = req.cookies.calendlyReturnUrl || '/';

  if (!code) {
    console.error('No authorization code received from Calendly');
    return res.redirect(`${returnUrl}?error=auth_failed&reason=no_code`);
  }

  try {
    // 1. Exchange authorization code for access token
    const tokenResponse = await fetch('https://auth.calendly.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CALENDLY_CLIENT_ID,
        client_secret: CALENDLY_CLIENT_SECRET,
        code,
        redirect_uri: CALENDLY_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error('Failed to exchange code for token:', error);
      return res.redirect(`${returnUrl}?error=auth_failed&reason=token_exchange`);
    }

    const tokenData = await tokenResponse.json();
    const { access_token, refresh_token, expires_in } = tokenData;

    // 2. Get the Calendly user info
    const userResponse = await fetch('https://api.calendly.com/users/me', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!userResponse.ok) {
      const error = await userResponse.text();
      console.error('Failed to get Calendly user info:', error);
      return res.redirect(`${returnUrl}?error=auth_failed&reason=user_info`);
    }

    const userData = await userResponse.json();
    const calendlyUid = userData.resource.uri.split('/').pop();

    // 3. Get the user from the request context using auth cookie
    const { user } = await supabase.auth.getUser(req.cookies['sb-access-token'] || req.cookies['sb:token']);

    if (!user) {
      console.error('No authenticated user found');
      return res.redirect(`${returnUrl}?error=auth_failed&reason=no_user`);
    }

    // 4. Calculate token expiration
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + expires_in);

    // 5. Store the Calendly tokens in Supabase
    const { data, error } = await supabase
      .from('calendly_users')
      .upsert({
        user_id: user.id,
        calendly_uid: calendlyUid,
        access_token,
        refresh_token,
        token_expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id',
        returning: 'minimal'
      });

    if (error) {
      console.error('Failed to store Calendly tokens:', error);
      return res.redirect(`${returnUrl}?error=auth_failed&reason=db_error`);
    }

    // Success! Redirect back to the app
    res.redirect(`${returnUrl}?calendlyConnected=true`);
  } catch (error) {
    console.error('Error in Calendly OAuth callback:', error);
    res.redirect(`${returnUrl}?error=auth_failed&reason=server_error`);
  }
}