import { Pool } from 'pg';

// Initialize PostgreSQL client
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get user_id from request body
  const { user_id } = req.body;
  
  if (!user_id) {
    return res.status(400).json({ error: 'Missing user_id parameter' });
  }

  try {
    // Delete the Calendly connection for this user
    await pool.query(
      'DELETE FROM calendly_users WHERE user_id = $1',
      [user_id]
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error disconnecting Calendly:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}