// API route to initiate Calendly OAuth flow

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get user_id from query parameters
  const { user_id } = req.query;
  
  if (!user_id) {
    return res.status(400).json({ error: 'Missing user_id parameter' });
  }

  const clientId = process.env.CALENDLY_CLIENT_ID;
  const redirectUri = process.env.CALENDLY_REDIRECT_URI || "http://localhost:3000/oauth/callback";
  
  // Build the authorization URL
  const authUrl = 'https://auth.calendly.com/oauth/authorize';
  const scopes = 'default';
  const responseType = 'code';
  
  // Include user_id in the state parameter for the callback to retrieve
  const state = JSON.stringify({ user_id });
  
  const authorizationUrl = `${authUrl}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${scopes}&state=${encodeURIComponent(state)}`;

  console.log('Redirecting to Calendly authorization URL:', authorizationUrl);
  
  // Redirect the user to Calendly's authorization page
  res.redirect(authorizationUrl);
}