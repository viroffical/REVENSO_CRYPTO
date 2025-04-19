import { createClient } from '@supabase/supabase-js';
import { Pool } from 'pg';

// Initialize PostgreSQL client
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get user_id from query or cookies
  const { user_id } = req.query;
  
  if (!user_id) {
    return res.status(400).json({ 
      connected: false, 
      error: 'Missing user_id parameter' 
    });
  }

  try {
    // Check if the user has a Calendly connection
    const result = await pool.query(
      'SELECT * FROM calendly_users WHERE user_id = $1',
      [user_id]
    );
    
    const calendlyUser = result.rows[0];

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
