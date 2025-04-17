import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

export default function AuthCallback() {
  const router = useRouter();
  
  useEffect(() => {
    const { hash } = window.location;
    
    const handleCallback = async () => {
      try {
        // Initialize Supabase client
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        
        // Process the hash if present
        if (hash) {
          const { data, error } = await supabase.auth.getUser();
          
          if (error) {
            console.error('Error getting user:', error);
            router.push('/login?error=Authentication failed');
            return;
          }
          
          if (data.user) {
            // Fetch additional user data
            const { data: userData, error: userError } = await supabase
              .from('user')
              .select('*')
              .eq('id', data.user.id)
              .single();
              
            if (userError && !userError.message.includes('No rows found')) {
              console.error('Error fetching user data:', userError);
            }
            
            // Fetch profile details
            const { data: profileData, error: profileError } = await supabase
              .from('profile_details')
              .select('*')
              .eq('user_id', data.user.id)
              .single();
              
            if (profileError && !profileError.message.includes('No rows found')) {
              console.error('Error fetching profile data:', profileError);
            }
            
            // Create combined user object
            const userWithProfile = {
              ...data.user,
              ...userData,
              profile: profileData || null
            };
            
            // Save to localStorage
            localStorage.setItem('revenso_user', JSON.stringify(userWithProfile));
            
            // Redirect to home page
            router.push('/');
          } else {
            router.push('/login?error=No user found');
          }
        } else {
          router.push('/login?error=No authentication data found');
        }
      } catch (error) {
        console.error('Callback error:', error);
        router.push('/login?error=Authentication processing failed');
      }
    };
    
    handleCallback();
  }, [router]);
  
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Processing authentication...</h1>
        <p>Please wait while we complete the sign-in process.</p>
      </div>
    </div>
  );
}