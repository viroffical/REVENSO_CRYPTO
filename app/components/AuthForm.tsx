'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SignInWithGoogleButton from './SignInWithGoogleButton';
import { createClientSupabase } from '../lib/supabase';

// Form validation schema
const authSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(100),
});

type AuthFormValues = z.infer<typeof authSchema>;

interface AuthFormProps {
  view: 'sign-in' | 'sign-up';
}

export default function AuthForm({ view }: AuthFormProps) {
  const router = useRouter();
  const supabase = createClientSupabase();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formData: AuthFormValues) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      if (view === 'sign-in') {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          throw error;
        }

        router.refresh();
        router.push('/dashboard');
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) {
          throw error;
        }

        router.refresh();
        router.push('/auth/signup/success');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred during authentication');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errorMessage && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {errorMessage}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register('email')}
              className="form-input"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              type="password"
              autoComplete={view === 'sign-in' ? 'current-password' : 'new-password'}
              {...register('password')}
              className="form-input"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary"
          >
            {isLoading ? 'Loading...' : view === 'sign-in' ? 'Sign in' : 'Sign up'}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6">
          <SignInWithGoogleButton 
            mode={view === 'sign-in' ? 'signin' : 'signup'} 
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}