import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Calendly OAuth settings
const CALENDLY_CLIENT_ID = process.env.CALENDLY_CLIENT_ID;
const CALENDLY_REDIRECT_URI = process.env.CALENDLY_REDIRECT_URI || 
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/calendly/callback`;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Create the OAuth2 authorization URL
  const authUrl = new URL('https://auth.calendly.com/oauth/authorize');
  authUrl.searchParams.append('client_id', CALENDLY_CLIENT_ID);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('redirect_uri', CALENDLY_REDIRECT_URI);
  
  // Get the return URL from the query parameter or default to home
  const returnUrl = req.query.returnUrl || '/';
  
  // Store the return URL in a cookie so we can redirect back after auth
  res.setHeader('Set-Cookie', `calendlyReturnUrl=${returnUrl}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600`);
  
  // Redirect to Calendly's authorization page
  res.redirect(authUrl.toString());
}