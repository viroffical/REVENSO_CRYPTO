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

    // Extract user data from request body
    const { 
      fullName, 
      email, 
      password, 
      twitter, 
      profileImage, 
      profileImagePreview,
      role,
      project,
      bio,
      event
    } = req.body;

    // Handle image upload to Supabase Storage
    let avatarUrl = null;
    
    // Process image - handle both File object and base64 string
    if (profileImage || profileImagePreview) {
      try {
        const timestamp = new Date().getTime();
        const filePath = `${timestamp}_${email.replace('@', '_at_')}`;
        
        // If we have a base64 string (profileImagePreview)
        if (profileImagePreview && profileImagePreview.includes('base64')) {
          // Extract the base64 data without the prefix
          const base64Data = profileImagePreview.split(',')[1];
          
          // Convert base64 to Blob
          const blob = Buffer.from(base64Data, 'base64');
          
          // Upload to Supabase Storage
          const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from('avatar')
            .upload(filePath, blob, {
              contentType: 'image/jpeg', // Adjust based on your image type
              upsert: true
            });
            
          if (uploadError) {
            console.error('Error uploading avatar:', uploadError);
            throw new Error('Failed to upload profile image');
          }
          
          // Get the public URL
          const { data: { publicUrl } } = supabase
            .storage
            .from('avatar')
            .getPublicUrl(filePath);
            
          avatarUrl = publicUrl;
        }
        // If we have a File object, we'd normally handle it here
        // But since we're in an API route, we should have already received base64
      } catch (error) {
        console.error('Error processing image:', error);
        return res.status(500).json({ error: 'Failed to process profile image' });
      }
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
    
    // 2. Store user details in the user table
    const { data: userData, error: userError } = await supabase
      .from('user')
      .insert([{
        id: userId, // Use the auth user ID
        full_name: fullName,
        email,
        twitter,
        avatar: avatarUrl,
      }])
      .select();
      
    if (userError) {
      console.error('User insert error:', userError);
      return res.status(400).json({ error: userError.message });
    }
    
    // 3. Store profile details in the profile_details table
    const { data: profileData, error: profileError } = await supabase
      .from('profile_details')
      .insert([{
        user_id: userId,
        role,
        project,
        description: bio,
        event_attending: event,
      }])
      .select();
      
    if (profileError) {
      console.error('Profile insert error:', profileError);
      return res.status(400).json({ error: profileError.message });
    }
    
    // Return success response with created user data
    return res.status(201).json({
      user: authData.user,
      profile: {
        ...userData[0],
        ...profileData[0]
      }
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Failed to create account' });
  }
}