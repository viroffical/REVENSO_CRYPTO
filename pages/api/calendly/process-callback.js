import axios from "axios";
import { Pool } from "pg";

// Initialize PostgreSQL client
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Helper function to exchange auth code for tokens
async function exchangeCodeForTokens(code) {
  try {
    const response = await axios.post("https://auth.calendly.com/oauth/token", {
      client_id: "whbJPFMaNVvKb91QxB5NGPeJtRFCqxQYnhTEnhCThMI",
      client_secret: "YD5I229i7LCfakbIhVY9-0iIlijh3f9iwS7cP3gGSGM",
      code,
      redirect_uri: "https://workspace.krishnavirnlu.repl.co/oauth/callback",
      grant_type: "authorization_code",
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error exchanging code for tokens:",
      error.response?.data || error.message,
    );
    throw error;
  }
}

// Helper function to get Calendly user info
async function getCalendlyUserInfo(accessToken) {
  console.log(accessToken, "accessToken");
  try {
    const response = await axios.get("https://api.calendly.com/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(response, "response");
    return response.data.resource;
  } catch (error) {
    console.error(
      "Error fetching Calendly user info:",
      error.response?.data || error.message,
    );
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code, userId } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Missing authorization code" });
  }

  if (!userId) {
    return res.status(400).json({ error: "Missing user ID" });
  }

  try {
    // Exchange the authorization code for tokens
    const { access_token, refresh_token } = await exchangeCodeForTokens(code);

    // Get the user's Calendly info
    const calendlyUser = await getCalendlyUserInfo(access_token);

    // Check if user already exists
    const checkResult = await pool.query(
      "SELECT * FROM calendly_users WHERE calendly_uid = $1",
      [calendlyUser.uri],
    );

    const existingUser = checkResult.rows[0];

    if (existingUser) {
      // Update tokens if user exists
      await pool.query(
        "UPDATE calendly_users SET access_token = $1, refresh_token = $2, updated_at = NOW() WHERE id = $3",
        [access_token, refresh_token, existingUser.id],
      );
    } else {
      // Create new user record
      await pool.query(
        "INSERT INTO calendly_users (user_id, calendly_uid, access_token, refresh_token) VALUES ($1, $2, $3, $4)",
        [userId, calendlyUser.uri, access_token, refresh_token],
      );
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in API callback handler:", error);
    return res.status(500).json({
      error: error.message || "Internal server error",
      details: error.response?.data,
    });
  }
}
