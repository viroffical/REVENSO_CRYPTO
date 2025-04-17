import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    
    // Check if the 'avatar' bucket exists in Storage
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    // If bucket doesn't exist, create it
    if (!buckets?.find(bucket => bucket.name === 'avatar')) {
      const { error: createBucketError } = await supabase.storage.createBucket('avatar', {
        public: true // Make the bucket publicly accessible for avatar images
      });
      
      if (createBucketError) {
        console.error('Error creating avatar bucket:', createBucketError);
        return res.status(500).json({ 
          error: 'Failed to initialize storage for profile images. Please contact administrator.'
        });
      }
    }

    // Extract user data from request body
    const { 
      fullName, 
      email, 
      password, 
      twitter, 
      profileImage, 
      profileImagePreview,
      profileImageUrl, // New field for direct Supabase URL
      role,
      project,
      bio,
      event
    } = req.body;

    // Handle image upload to Supabase Storage
    let avatarUrl = profileImageUrl || null; // Use the direct URL if available
    
    // Process image only if we don't already have a URL and have base64 data
    if (!avatarUrl && profileImagePreview) {
      try {
        // If we have a base64 string
        if (profileImagePreview.includes('base64')) {
          // Extract the base64 data and determine the type
          const matches = profileImagePreview.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
          
          if (!matches || matches.length !== 3) {
            throw new Error('Invalid image format');
          }
          
          // Get the file type and data
          const contentType = matches[1];
          const base64Data = matches[2];
          
          // Determine file extension based on mime type
          let fileExtension = 'jpg';
          if (contentType === 'image/png') fileExtension = 'png';
          if (contentType === 'image/gif') fileExtension = 'gif';
          if (contentType === 'image/svg+xml') fileExtension = 'svg';
          
          // Convert base64 to Blob
          const blob = Buffer.from(base64Data, 'base64');
          
          // Generate a unique filename with timestamp and email
          const timestamp = new Date().getTime();
          const emailSanitized = email.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
          const filePath = `${timestamp}_${emailSanitized}`;
          
          console.log(`Uploading profile image to avatar/${filePath}.${fileExtension}`);
          
          // Upload to Supabase Storage with extension
          const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from('avatar')
            .upload(`${filePath}.${fileExtension}`, blob, {
              contentType, // Use the detected content type
              cacheControl: '3600',
              upsert: true
            });
            
          if (uploadError) {
            console.error('Error uploading avatar:', uploadError);
            throw new Error(`Failed to upload profile image: ${uploadError.message}`);
          }
          
          // Get the public URL with the correct path including extension
          const { data: { publicUrl } } = supabase
            .storage
            .from('avatar')
            .getPublicUrl(`${filePath}.${fileExtension}`);
            
          console.log(`Profile image uploaded successfully. Public URL: ${publicUrl}`);
          avatarUrl = publicUrl;
        } else {
          throw new Error('Profile image must be in base64 format');
        }
      } catch (error) {
        console.error('Error processing image:', error);
        return res.status(500).json({ error: `Failed to process profile image: ${error.message}` });
      }
    } else {
      console.warn('No profile image provided during registration');
    }
    
    // 1. Register user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (authError) {
      console.error('Auth error:', authError);
      return res.status(400).json({ error: authError.message });
    }
    
    const userId = authData.user.id;
    console.log('User created with ID:', userId);
    
    try {
      // 2. Store user details in the users table (renamed from user to match Supabase conventions)
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([{
          id: userId, // Use the auth user ID
          full_name: fullName,
          email,
          twitter,
          image_url: avatarUrl, // Store image URL in image_url field
          created_at: new Date().toISOString()
        }])
        .select();
        
      if (userError) {
        console.error('User insert error:', userError);
        
        // If table doesn't exist, try to create it
        if (userError.message?.includes('does not exist')) {
          console.log('Creating users table...');
          // Create the users table if it doesn't exist
          const { error: sqlError } = await supabase.rpc('exec_sql', {
            sql: `
            CREATE TABLE IF NOT EXISTS "users" (
              id UUID PRIMARY KEY,
              full_name TEXT NOT NULL,
              email TEXT UNIQUE NOT NULL,
              twitter TEXT,
              image_url TEXT,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
            `
          });
          
          if (sqlError) {
            console.error('Error creating users table:', sqlError);
            return res.status(500).json({ 
              error: 'Database setup issue: Could not create users table. Please contact the administrator.'
            });
          }
          
          // Try insert again after creating table
          const { data: retryUserData, error: retryUserError } = await supabase
            .from('users')
            .insert([{
              id: userId,
              full_name: fullName,
              email,
              twitter,
              image_url: avatarUrl,
              created_at: new Date().toISOString()
            }])
            .select();
            
          if (retryUserError) {
            console.error('User insert retry error:', retryUserError);
            return res.status(400).json({ error: retryUserError.message });
          }
        } else {
          return res.status(400).json({ error: userError.message });
        }
      }
      
      console.log('User data stored successfully');
      
      // 3. Store profile details in the profile_details table
      const { data: profileData, error: profileError } = await supabase
        .from('profile_details')
        .insert([{
          user_id: userId,
          role,
          project,
          description: bio, // Map bio to description field
          event_attending: event,
          created_at: new Date().toISOString()
        }])
        .select();
        
      if (profileError) {
        console.error('Profile insert error:', profileError);
        
        // If table doesn't exist, try to create it
        if (profileError.message?.includes('does not exist')) {
          console.log('Creating profile_details table...');
          // Create the profile_details table if it doesn't exist
          const { error: sqlError } = await supabase.rpc('exec_sql', {
            sql: `
            CREATE TABLE IF NOT EXISTS "profile_details" (
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              user_id UUID REFERENCES "users"(id) ON DELETE CASCADE,
              role TEXT NOT NULL,
              project TEXT,
              description TEXT,
              event_attending TEXT,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
            CREATE INDEX IF NOT EXISTS idx_profile_details_user_id ON profile_details(user_id);
            `
          });
          
          if (sqlError) {
            console.error('Error creating profile_details table:', sqlError);
            return res.status(500).json({ 
              error: 'Database setup issue: Could not create profile_details table. Please contact the administrator.'
            });
          }
          
          // Try insert again after creating table
          const { data: retryProfileData, error: retryProfileError } = await supabase
            .from('profile_details')
            .insert([{
              user_id: userId,
              role,
              project,
              description: bio,
              event_attending: event,
              created_at: new Date().toISOString()
            }])
            .select();
            
          if (retryProfileError) {
            console.error('Profile insert retry error:', retryProfileError);
            return res.status(400).json({ error: retryProfileError.message });
          }
        } else {
          return res.status(400).json({ error: profileError.message });
        }
      }
      
      console.log('Profile details stored successfully');
      
      // Return success response with created user data
      return res.status(201).json({
        user: authData.user,
        profile: {
          ...userData?.[0] || {},
          ...profileData?.[0] || {}
        }
      });
    } catch (dbError) {
      console.error('Database operation error:', dbError);
      return res.status(500).json({ error: `Database error: ${dbError.message}` });
    }
    
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Failed to create account' });
  }
}