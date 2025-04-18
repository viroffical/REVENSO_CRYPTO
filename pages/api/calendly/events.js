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

    const { access_token, token_expires_at, calendly_uid } = userData;

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

    // 3. Define the date range (e.g., events in the next 30 days)
    const startTime = new Date();
    const endTime = new Date();
    endTime.setDate(endTime.getDate() + 30); // Next 30 days

    // 4. Fetch scheduled events from Calendly API
    const eventsUrl = new URL('https://api.calendly.com/scheduled_events');
    eventsUrl.searchParams.append('user', `https://api.calendly.com/users/${calendly_uid}`);
    eventsUrl.searchParams.append('min_start_time', startTime.toISOString());
    eventsUrl.searchParams.append('max_start_time', endTime.toISOString());
    eventsUrl.searchParams.append('status', 'active');

    const eventsResponse = await fetch(eventsUrl.toString(), {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!eventsResponse.ok) {
      const error = await eventsResponse.text();
      console.error('Failed to fetch Calendly events:', error);
      return res.status(eventsResponse.status).json({ error: 'Failed to fetch Calendly events' });
    }

    const eventsData = await eventsResponse.json();

    // 5. Return the events
    res.status(200).json(eventsData);
  } catch (error) {
    console.error('Error fetching Calendly events:', error);
    res.status(500).json({ error: 'Server error' });
  }
}