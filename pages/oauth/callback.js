import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function OAuthCallback() {
  const router = useRouter();
  const { code, error, state } = router.query;

  useEffect(() => {
    async function processCallback() {
      if (!code || error) {
        router.push('/?tab=meetings&error=' + (error || 'missing_code'));
        return;
      }

      try {
        // Get user_id from state parameter
        let userId;
        try {
          if (state) {
            const stateObj = JSON.parse(decodeURIComponent(state));
            userId = stateObj.user_id;
          }
        } catch (e) {
          console.error('Error parsing state:', e);
        }

        if (!userId) {
          // Try to get userId from localStorage as fallback
          const storedUser = localStorage.getItem('revenso_user');
          if (storedUser) {
            try {
              const userObj = JSON.parse(storedUser);
              userId = userObj.id;
            } catch (err) {
              console.error('Error parsing user from localStorage:', err);
            }
          }
        }

        if (!userId) {
          router.push('/?tab=meetings&error=missing_user_id');
          return;
        }

        // Process the OAuth code on the server
        const response = await fetch('/api/calendly/process-callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
            userId,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to process Calendly authorization');
        }

        // Redirect back to the meetings page with success
        router.push('/?tab=meetings&calendly=connected');
      } catch (error) {
        console.error('Error in OAuth callback:', error);
        router.push(`/?tab=meetings&error=${encodeURIComponent(error.message || 'oauth_error')}`);
      }
    }

    if (code) {
      processCallback();
    }
  }, [code, error, state, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Connecting to Calendly...</h2>
        <p className="text-gray-600 mb-6">
          Please wait while we complete your Calendly authorization.
        </p>
        <div className="animate-spin w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto"></div>
      </div>
    </div>
  );
}