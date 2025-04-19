import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

// Hardcoded values for Replit environment
const SUPABASE_URL = 'https://rjucgbzerztofpuotjgr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqdWNnYnplcnp0b2ZwdW90amdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MzI2MTAsImV4cCI6MjA2MDIwODYxMH0.jf08hvHlAP5RAXqziUa8rytGR60xqRWnUAuhqfo-pek';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
      
      // Exchange code for tokens with hardcoded values
      const tokenResponse = await axios.post('https://auth.calendly.com/oauth/token', {
        client_id: 'whbJPFMaNVvKb91QxB5NGPeJtRFCqxQYnhTEnhCThMI',
        client_secret: 'YD5I229i7LCfakbIhVY9-0iIlijh3f9iwS7cP3gGSGM',
        code,
        redirect_uri: 'http://localhost:5000/api/auth/calendly',
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
      // Hardcoded Calendly values for Replit environment
      const clientId = 'whbJPFMaNVvKb91QxB5NGPeJtRFCqxQYnhTEnhCThMI';
      const redirectUri = 'http://localhost:5000/api/auth/calendly';
      const authBaseUrl = 'https://auth.calendly.com';
      
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