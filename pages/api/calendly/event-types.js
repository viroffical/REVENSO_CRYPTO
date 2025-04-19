import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Helper function to refresh an access token
async function refreshAccessToken(refreshToken) {
  try {
    const response = await axios.post('https://auth.calendly.com/oauth/token', {
      client_id: process.env.CALENDLY_CLIENT_ID,
      client_secret: process.env.CALENDLY_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    });

    return response.data;
  } catch (error) {
    console.error('Error refreshing access token:', error.response?.data || error.message);
    throw error;
  }
}

// Get Calendly user info
async function getCalendlyUserInfo(accessToken) {
  try {
    const response = await axios.get('https://api.calendly.com/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    
    return response.data.resource;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Unauthorized: Access token is invalid or expired');
    }
    console.error('Error fetching Calendly user info:', error.response?.data || error.message);
    throw error;
  }
}

// Get Calendly event types for a user
async function getCalendlyEventTypes(accessToken, userUri) {
  try {
    const response = await axios.get(`https://api.calendly.com/event_types`, {
      params: {
        user: userUri,
        count: 100
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Unauthorized: Access token is invalid or expired');
    }
    console.error('Error fetching Calendly event types:', error.response?.data || error.message);
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the current user from the session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Get the Calendly connection for this user
    const { data: calendlyUser, error: calendlyError } = await supabase
      .from('calendly_users')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (calendlyError || !calendlyUser) {
      return res.status(400).json({ error: 'Calendly account not connected' });
    }

    let accessToken = calendlyUser.access_token;
    let refreshToken = calendlyUser.refresh_token;

    try {
      // Get the user info with the current access token
      const userInfo = await getCalendlyUserInfo(accessToken);
      
      // Get event types
      const eventTypes = await getCalendlyEventTypes(accessToken, userInfo.uri);
      
      return res.status(200).json(eventTypes);
    } catch (error) {
      // If the token is expired, try to refresh it
      if (error.message?.includes('Unauthorized') || error.response?.status === 401) {
        try {
          // Refresh the token
          const { access_token, refresh_token } = await refreshAccessToken(refreshToken);
          
          // Update the tokens in the database
          await supabase
            .from('calendly_users')
            .update({
              access_token,
              refresh_token,
              updated_at: new Date().toISOString()
            })
            .eq('id', calendlyUser.id);
          
          // Get the user info with the new access token
          const userInfo = await getCalendlyUserInfo(access_token);
          
          // Get event types with the new token
          const eventTypes = await getCalendlyEventTypes(access_token, userInfo.uri);
          
          return res.status(200).json(eventTypes);
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          return res.status(401).json({ error: 'Failed to refresh authentication' });
        }
      }
      
      // For other errors
      console.error('Error fetching event types:', error);
      return res.status(500).json({ error: 'Failed to fetch Calendly event types' });
    }
  } catch (error) {
    console.error('Error in event-types endpoint:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}