import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './_app';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Only redirect after auth state is determined
    if (!loading) {
      if (user) {
        // If logged in, redirect to dashboard
        router.push('/dashboard');
      } else {
        // If not logged in, redirect to login
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  // Loading state while auth is being checked
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}