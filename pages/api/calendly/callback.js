import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Helper function to exchange auth code for tokens
async function exchangeCodeForTokens(code) {
  const clientId = process.env.CALENDLY_CLIENT_ID;
  const clientSecret = process.env.CALENDLY_CLIENT_SECRET;
  const redirectUri = process.env.CALENDLY_REDIRECT_URI || `${process.env.NEXT_PUBLIC_BASE_URL}/api/calendly/callback`;

  try {
    const response = await axios.post('https://auth.calendly.com/oauth/token', {
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    });

    return response.data;
  } catch (error) {
    console.error('Error exchanging code for tokens:', error.response?.data || error.message);
    throw error;
  }
}

// Helper function to get Calendly user info
async function getCalendlyUserInfo(accessToken) {
  try {
    const response = await axios.get('https://api.calendly.com/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    
    return response.data.resource;
  } catch (error) {
    console.error('Error fetching Calendly user info:', error.response?.data || error.message);
    throw error;
  }
}

// Helper function to find or create a Calendly user record
async function findOrCreateCalendlyUser({ userId, calendlyUid, accessToken, refreshToken }) {
  // First, check if the user already exists
  const { data: existingUser, error: fetchError } = await supabase
    .from('calendly_users')
    .select('*')
    .eq('calendly_uid', calendlyUid)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error fetching Calendly user:', fetchError);
    throw fetchError;
  }

  // If the user exists, update their tokens
  if (existingUser) {
    const { error: updateError } = await supabase
      .from('calendly_users')
      .update({
        access_token: accessToken,
        refresh_token: refreshToken,
        updated_at: new Date().toISOString()
      })
      .eq('id', existingUser.id);

    if (updateError) {
      console.error('Error updating Calendly user:', updateError);
      throw updateError;
    }

    return existingUser;
  }

  // Otherwise, create a new user record
  const { data: newUser, error: insertError } = await supabase
    .from('calendly_users')
    .insert([{
      user_id: userId,
      calendly_uid: calendlyUid,
      access_token: accessToken,
      refresh_token: refreshToken
    }])
    .select()
    .single();

  if (insertError) {
    console.error('Error creating Calendly user:', insertError);
    throw insertError;
  }

  return newUser;
}

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, error } = req.query;

  // Handle authorization errors
  if (error) {
    console.error('Authorization error:', error);
    return res.redirect('/?error=authorization_failed');
  }

  // Handle missing code
  if (!code) {
    console.error('Missing authorization code');
    return res.redirect('/?error=missing_code');
  }

  try {
    // Exchange the authorization code for tokens
    const { access_token, refresh_token } = await exchangeCodeForTokens(code);
    
    // Get the user's Calendly info
    const calendlyUser = await getCalendlyUserInfo(access_token);
    
    // Get the current user from session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      console.error('Error getting session:', sessionError || 'No session found');
      return res.redirect('/?error=auth_required');
    }
    
    // Store the Calendly connection in our database
    await findOrCreateCalendlyUser({
      userId: session.user.id,
      calendlyUid: calendlyUser.uri,
      accessToken: access_token,
      refreshToken: refresh_token
    });
    
    // Redirect back to the meetings page with success
    return res.redirect('/?tab=meetings&calendly=connected');
  } catch (error) {
    console.error('Error in OAuth callback:', error);
    return res.redirect(`/?error=${encodeURIComponent(error.message || 'oauth_error')}`);
  }
}