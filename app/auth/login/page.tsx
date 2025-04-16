import AuthForm from '../../components/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | REVENSO',
  description: 'Sign in to your REVENSO account',
};

export default function SignIn() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome back to REVENSO
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to your account to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <AuthForm view="sign-in" />
      </div>
    </div>
  );
}