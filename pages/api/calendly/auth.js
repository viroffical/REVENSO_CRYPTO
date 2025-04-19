// API route to initiate Calendly OAuth flow

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientId = process.env.CALENDLY_CLIENT_ID;
  const redirectUri = process.env.CALENDLY_REDIRECT_URI || `${process.env.NEXT_PUBLIC_BASE_URL}/api/calendly/callback`;
  
  // Build the authorization URL
  const authUrl = 'https://auth.calendly.com/oauth/authorize';
  const scopes = 'default';
  const responseType = 'code';
  
  const authorizationUrl = `${authUrl}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${scopes}`;

  // Redirect the user to Calendly's authorization page
  res.redirect(authorizationUrl);
}