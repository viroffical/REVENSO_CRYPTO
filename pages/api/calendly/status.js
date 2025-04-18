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
    // Check if the user has connected Calendly
    const { data, error } = await supabase
      .from('calendly_users')
      .select('calendly_uid, created_at')
      .eq('user_id', user.id)
      .single();

    const isConnected = !error && !!data;

    res.status(200).json({
      connected: isConnected,
      calendlyUid: isConnected ? data.calendly_uid : null,
      connectedSince: isConnected ? data.created_at : null,
    });
  } catch (error) {
    console.error('Error checking Calendly connection status:', error);
    res.status(500).json({ error: 'Server error' });
  }
}