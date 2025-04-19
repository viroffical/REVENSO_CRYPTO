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

// Get Calendly scheduled events for a user
async function getCalendlyEvents(accessToken, userUri, params = {}) {
  try {
    // Current time in ISO format
    const now = new Date().toISOString();
    
    // Default params
    const defaultParams = {
      user: userUri,
      min_start_time: now,
      count: 50,
      status: 'active',
      sort: 'start_time:asc'
    };
    
    // Merge default params with any additional params
    const queryParams = { ...defaultParams, ...params };
    
    const response = await axios.get('https://api.calendly.com/scheduled_events', {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Unauthorized: Access token is invalid or expired');
    }
    console.error('Error fetching Calendly events:', error.response?.data || error.message);
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract query parameters
    const { min_start_time, max_start_time, count, status, sort, page_token } = req.query;
    
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

    // Build params for the Calendly API
    const apiParams = {};
    if (min_start_time) apiParams.min_start_time = min_start_time;
    if (max_start_time) apiParams.max_start_time = max_start_time;
    if (count) apiParams.count = count;
    if (status) apiParams.status = status;
    if (sort) apiParams.sort = sort;
    if (page_token) apiParams.page_token = page_token;

    try {
      // Get the user info with the current access token
      const userInfo = await getCalendlyUserInfo(accessToken);
      
      // Get scheduled events
      const events = await getCalendlyEvents(accessToken, userInfo.uri, apiParams);
      
      return res.status(200).json(events);
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
          
          // Get events with the new token
          const events = await getCalendlyEvents(access_token, userInfo.uri, apiParams);
          
          return res.status(200).json(events);
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          return res.status(401).json({ error: 'Failed to refresh authentication' });
        }
      }
      
      // For other errors
      console.error('Error fetching events:', error);
      return res.status(500).json({ error: 'Failed to fetch Calendly events' });
    }
  } catch (error) {
    console.error('Error in events endpoint:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}