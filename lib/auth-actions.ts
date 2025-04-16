'use server'

import { createClient } from '../utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export type AuthFormData = {
  email: string
  password: string
}

export type ActionResult = {
  error: string | null
  success?: boolean
}

/**
 * Sign in with email and password
 */
export async function login(formData: AuthFormData): Promise<ActionResult> {
  const supabase = createClient()
  
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })
  
  if (error) {
    return { error: error.message }
  }
  
  return { error: null, success: true }
}

/**
 * Sign up with email and password
 */
export async function signup(formData: AuthFormData): Promise<ActionResult> {
  const supabase = createClient()
  
  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'}/auth/confirm`,
    },
  })
  
  if (error) {
    return { error: error.message }
  }
  
  return { error: null, success: true }
}

/**
 * Sign out and redirect to home page
 */
export async function signout() {
  const supabase = createClient()
  
  await supabase.auth.signOut()
  
  // The cookies will be automatically handled by Supabase
  
  redirect('/')
}

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle(): Promise<ActionResult> {
  const supabase = createClient()
  
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'}/auth/confirm`,
    },
  })
  
  if (error) {
    return { error: error.message }
  }
  
  return { error: null, success: true }
}

/**
 * Reset password with email
 */
export async function resetPassword(email: string): Promise<ActionResult> {
  const supabase = createClient()
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'}/auth/reset-password/confirm`,
  })
  
  if (error) {
    return { error: error.message }
  }
  
  return { error: null, success: true }
}