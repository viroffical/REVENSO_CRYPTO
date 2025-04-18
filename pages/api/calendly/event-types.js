import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role key for admin privileges
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get user from the request
  const { user } = await supabase.auth.getUser(req.cookies['sb-access-token'] || req.cookies['sb:token']);
  
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    // 1. Get the Calendly credentials from the database
    const { data: userData, error: userError } = await supabase
      .from('calendly_users')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (userError || !userData) {
      return res.status(404).json({ error: 'Calendly connection not found' });
    }

    let { access_token, token_expires_at, calendly_uid } = userData;

    // 2. Check if the token is expired and refresh if needed
    const now = new Date();
    const expiresAt = new Date(token_expires_at);
    
    if (now >= expiresAt) {
      // Token is expired, we need to refresh it
      const refreshResponse = await fetch('/api/calendly/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!refreshResponse.ok) {
        return res.status(401).json({ error: 'Failed to refresh token' });
      }
      
      // Get the updated token
      const { data: updatedUser, error: refreshError } = await supabase
        .from('calendly_users')
        .select('access_token')
        .eq('user_id', user.id)
        .single();
        
      if (refreshError || !updatedUser) {
        return res.status(500).json({ error: 'Failed to get refreshed token' });
      }
      
      // Use the new token
      access_token = updatedUser.access_token;
    }

    // 3. Fetch user's event types from Calendly API
    const eventTypesUrl = `https://api.calendly.com/event_types?user=${encodeURIComponent(`https://api.calendly.com/users/${calendly_uid}`)}&active=true`;

    const eventTypesResponse = await fetch(eventTypesUrl, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!eventTypesResponse.ok) {
      const error = await eventTypesResponse.text();
      console.error('Failed to fetch Calendly event types:', error);
      return res.status(eventTypesResponse.status).json({ error: 'Failed to fetch Calendly event types' });
    }

    const eventTypesData = await eventTypesResponse.json();

    // 4. Return the event types
    res.status(200).json(eventTypesData);
  } catch (error) {
    console.error('Error fetching Calendly event types:', error);
    res.status(500).json({ error: 'Server error' });
  }
}