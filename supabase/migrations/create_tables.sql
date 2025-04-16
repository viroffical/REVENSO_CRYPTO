-- Create the user table if it doesn't exist
CREATE TABLE IF NOT EXISTS "user" (
  id UUID PRIMARY KEY, -- Links to the Supabase Auth user ID
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  twitter TEXT,
  avatar TEXT, -- URL to profile image in Supabase Storage
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the profile_details table if it doesn't exist
CREATE TABLE IF NOT EXISTS "profile_details" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES "user"(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  project TEXT,
  description TEXT,
  event_attending TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the necessary indexes for performance
CREATE INDEX IF NOT EXISTS idx_profile_details_user_id ON profile_details(user_id);

-- Enable Row Level Security (RLS) for both tables
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_details ENABLE ROW LEVEL SECURITY;

-- Create policies for user table
-- Only authenticated users can see their own data
CREATE POLICY user_select_own ON "user"
  FOR SELECT
  USING (auth.uid() = id);

-- Only authenticated users can update their own data
CREATE POLICY user_update_own ON "user"
  FOR UPDATE
  USING (auth.uid() = id);

-- Create policies for profile_details table
-- Only authenticated users can see their own profiles
CREATE POLICY profile_select_own ON profile_details
  FOR SELECT
  USING (auth.uid() = user_id);

-- Only authenticated users can update their own profiles
CREATE POLICY profile_update_own ON profile_details
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Allow authenticated users to insert their own profile
CREATE POLICY profile_insert_own ON profile_details
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);