import { createClient } from '../../../utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  if (code) {
    const supabase = createClient()
    
    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)
    
    // Redirect to dashboard or home
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // If no code is present, redirect to error page
  return NextResponse.redirect(
    new URL('/auth/error?error=No+authentication+code+found', request.url)
  )
}