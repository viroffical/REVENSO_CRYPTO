import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role key for admin privileges
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get user from the request
  const { user } = await supabase.auth.getUser(req.cookies['sb-access-token'] || req.cookies['sb:token']);
  
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    // Delete the Calendly connection from the database
    const { error } = await supabase
      .from('calendly_users')
      .delete()
      .eq('user_id', user.id);

    if (error) {
      console.error('Failed to disconnect Calendly:', error);
      return res.status(500).json({ error: 'Failed to disconnect Calendly' });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error disconnecting Calendly:', error);
    res.status(500).json({ error: 'Server error' });
  }
}