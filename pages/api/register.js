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
    
    try {
      // 2. Insert into users table
      const { data: userData, error: userError } = await supabase
        .from('user')
        .insert([{
          id: userId, // Use the auth user ID as foreign key
          full_name: fullName,
          email: email,
          twitter: twitter,
          avatar: avatarUrl,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();
        
      if (userError) {
        console.error('User insert error:', userError);
        // Check if table doesn't exist error
        if (userError.message?.includes('does not exist')) {
          return res.status(500).json({ 
            error: 'Database setup issue: User table does not exist. Please contact the administrator.'
          });
        }
        return res.status(400).json({ error: userError.message });
      }
      
      // 3. Insert into profile_details table
      const { data: profileData, error: profileError } = await supabase
        .from('profile_details')
        .insert([{
          user_id: userId,
          role: role,
          project: project,
          description: bio,
          event_attending: event,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();
        
      if (profileError) {
        console.error('Profile insert error:', profileError);
        // Check if table doesn't exist error
        if (profileError.message?.includes('does not exist')) {
          return res.status(500).json({ 
            error: 'Database setup issue: Profile details table does not exist. Please contact the administrator.'
          });
        }
        return res.status(400).json({ error: profileError.message });
      }
      
      // Return success response with created user data
      return res.status(200).json({
        message: 'User registered successfully!',
        user: authData.user,
        profile: {
          ...userData,
          ...profileData
        }
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ error: `Database operation failed: ${dbError.message}` });
    }
    
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Failed to create account' });
  }
}