import axios from 'axios';
import { Pool } from 'pg';

// Initialize PostgreSQL client
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

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

  // Get user_id from query parameters
  const { user_id } = req.query;
  
  if (!user_id) {
    return res.status(400).json({ error: 'Missing user_id parameter' });
  }

  try {
    // Get the Calendly connection for this user
    const result = await pool.query(
      'SELECT * FROM calendly_users WHERE user_id = $1',
      [user_id]
    );
    
    const calendlyUser = result.rows[0];

    if (!calendlyUser) {
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
          await pool.query(
            'UPDATE calendly_users SET access_token = $1, refresh_token = $2, updated_at = NOW() WHERE id = $3',
            [access_token, refresh_token, calendlyUser.id]
          );
          
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