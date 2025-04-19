import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  // Handle OAuth callback when code is present in query params
  if (req.query.code) {
    try {
      const code = req.query.code;
      
      // Get user from session (requires authentication)
      const { data: { user }, error: authError } = await supabase.auth.getUser(
        req.headers.cookie?.match(/(?<=sb-.*?=)[^;]*/)?.[0]
      );
      
      if (authError || !user) {
        return res.status(401).json({ error: 'Unauthorized. User not authenticated.' });
      }
      
      console.log('User authenticated:', user.id);
      
      // Exchange code for tokens
      const tokenResponse = await axios.post('https://auth.calendly.com/oauth/token', {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code'
      });
      
      const { access_token, refresh_token } = tokenResponse.data;
      
      // Get Calendly user info
      const userInfoResponse = await axios.get('https://api.calendly.com/users/me', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      
      const calendlyUid = userInfoResponse.data.resource.uri;
      
      // Check if user already has Calendly connection
      const { data: existingConnection, error: queryError } = await supabase
        .from('calendly_connections')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (queryError && queryError.code !== 'PGRST116') {
        console.error('Error checking for existing connection:', queryError);
      }
      
      if (existingConnection) {
        // Update existing connection
        const { error: updateError } = await supabase
          .from('calendly_connections')
          .update({
            access_token,
            refresh_token,
            calendly_uid: calendlyUid,
            updated_at: new Date()
          })
          .eq('id', existingConnection.id);
          
        if (updateError) {
          throw new Error(`Failed to update Calendly connection: ${updateError.message}`);
        }
      } else {
        // Create new connection
        const { error: insertError } = await supabase
          .from('calendly_connections')
          .insert({
            user_id: user.id,
            calendly_uid: calendlyUid,
            access_token,
            refresh_token
          });
          
        if (insertError) {
          throw new Error(`Failed to save Calendly connection: ${insertError.message}`);
        }
      }
      
      // Redirect to dashboard with success message
      return res.redirect('/dashboard?calendly=connected');
    } catch (error) {
      console.error('Error processing Calendly OAuth:', error);
      return res.status(500).json({ 
        error: 'Failed to process Calendly authentication',
        details: error.message 
      });
    }
  } 
  // Handle initial OAuth redirect when no code is present
  else {
    try {
      // Get auth URL parameters
      const clientId = process.env.CLIENT_ID;
      const redirectUri = process.env.REDIRECT_URI;
      const authBaseUrl = process.env.CALENDLY_AUTH_BASE_URL;
      
      if (!clientId || !redirectUri || !authBaseUrl) {
        return res.status(500).json({ error: 'Missing Calendly configuration' });
      }
      
      // Create the authorization URL
      const authUrl = `${authBaseUrl}/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`;
      
      // Redirect to Calendly authorization page
      return res.redirect(authUrl);
    } catch (error) {
      console.error('Error initiating Calendly OAuth:', error);
      return res.status(500).json({ error: 'Failed to initiate Calendly authentication' });
    }
  }
}