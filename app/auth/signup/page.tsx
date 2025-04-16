import AuthForm from '../../components/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | REVENSO',
  description: 'Create a new REVENSO account',
};

export default function SignUp() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Join REVENSO
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create your account to connect with professionals at crypto events
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <AuthForm view="sign-up" />
      </div>
    </div>
  );
}