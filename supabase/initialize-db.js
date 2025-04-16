// This script can be run to initialize the database tables in Supabase
// Run with: node supabase/initialize-db.js

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env file if needed
// require('dotenv').config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

async function initializeDatabase() {
  // Create Supabase client
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  console.log('Starting database initialization...');
  
  try {
    // Read SQL file
    const sqlPath = path.join(__dirname, 'migrations', 'create_tables.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('Executing SQL to create tables...');
    
    // Execute the SQL
    const { error } = await supabase.rpc('exec_sql', { sql: sqlContent });
    
    if (error) {
      console.error('Error executing SQL:', error);
      process.exit(1);
    }
    
    console.log('Checking if the avatar bucket exists...');
    
    // Check if the 'avatar' bucket exists
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError);
      process.exit(1);
    }
    
    // Create the 'avatar' bucket if it doesn't exist
    if (!buckets?.find(bucket => bucket.name === 'avatar')) {
      console.log('Creating avatar bucket...');
      
      const { error: createBucketError } = await supabase.storage.createBucket('avatar', {
        public: true // Make it public for avatar access
      });
      
      if (createBucketError) {
        console.error('Error creating avatar bucket:', createBucketError);
        process.exit(1);
      }
      
      console.log('Avatar bucket created successfully');
    } else {
      console.log('Avatar bucket already exists');
    }
    
    console.log('Database initialization completed successfully');
    
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();