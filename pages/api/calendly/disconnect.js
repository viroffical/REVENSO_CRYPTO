import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the current user from the session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Delete the Calendly connection for this user
    const { error: deleteError } = await supabase
      .from('calendly_users')
      .delete()
      .eq('user_id', session.user.id);

    if (deleteError) {
      console.error('Error disconnecting Calendly:', deleteError);
      return res.status(500).json({ error: 'Failed to disconnect Calendly' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error disconnecting Calendly:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}