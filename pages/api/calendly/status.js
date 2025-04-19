import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the current user from the session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return res.status(401).json({ 
        connected: false, 
        error: 'Authentication required' 
      });
    }

    // Check if the user has a Calendly connection
    const { data: calendlyUser, error: calendlyError } = await supabase
      .from('calendly_users')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (calendlyError && calendlyError.code !== 'PGRST116') {
      console.error('Error fetching Calendly connection:', calendlyError);
      return res.status(500).json({ 
        connected: false,
        error: 'Failed to check Calendly connection' 
      });
    }

    // Return the connection status
    if (!calendlyUser) {
      return res.status(200).json({ connected: false });
    }

    return res.status(200).json({
      connected: true,
      calendlyUid: calendlyUser.calendly_uid,
      connectedSince: calendlyUser.created_at
    });
  } catch (error) {
    console.error('Error checking Calendly status:', error);
    return res.status(500).json({ 
      connected: false,
      error: 'Internal server error'
    });
  }
}