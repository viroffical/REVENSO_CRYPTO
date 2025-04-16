import { Metadata } from 'next';
import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AuthForm from '../../components/AuthForm';

export const metadata: Metadata = {
  title: 'Sign In | REVENSO',
};

export default async function SignIn() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  // If the user is already logged in, redirect to dashboard
  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-[calc(100vh-136px)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Sign in to your account</h2>
          <p className="text-sm text-gray-600 mb-8">
            Or{' '}
            <Link 
              href="/auth/signup" 
              className="font-medium text-yellow-500 hover:text-yellow-600"
            >
              create a new account
            </Link>
          </p>
        </div>

        <AuthForm view="sign-in" />

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                New to REVENSO?
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/auth/signup"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}