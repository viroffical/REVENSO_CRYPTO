import axios from 'axios';
import { Pool } from 'pg';

// Initialize PostgreSQL client
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

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
  const checkResult = await pool.query(
    'SELECT * FROM calendly_users WHERE calendly_uid = $1',
    [calendlyUid]
  );
  
  const existingUser = checkResult.rows[0];

  // If the user exists, update their tokens
  if (existingUser) {
    await pool.query(
      'UPDATE calendly_users SET access_token = $1, refresh_token = $2, updated_at = NOW() WHERE id = $3',
      [accessToken, refreshToken, existingUser.id]
    );
    
    return existingUser;
  }

  // Otherwise, create a new user record
  const insertResult = await pool.query(
    'INSERT INTO calendly_users (user_id, calendly_uid, access_token, refresh_token) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, calendlyUid, accessToken, refreshToken]
  );

  return insertResult.rows[0];
}

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, error, state } = req.query;

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

  // Parse the state to get the user_id
  let userId;
  try {
    if (state) {
      const stateObj = JSON.parse(decodeURIComponent(state));
      userId = stateObj.user_id;
    }
  } catch (e) {
    console.error('Error parsing state:', e);
  }

  if (!userId) {
    return res.redirect('/?error=missing_user_id');
  }

  try {
    // Exchange the authorization code for tokens
    const { access_token, refresh_token } = await exchangeCodeForTokens(code);
    
    // Get the user's Calendly info
    const calendlyUser = await getCalendlyUserInfo(access_token);
    
    // Store the Calendly connection in our database
    await findOrCreateCalendlyUser({
      userId,
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