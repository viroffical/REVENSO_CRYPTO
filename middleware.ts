import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

// We need to disable middleware for now since we're transitioning to App Router
// This avoids conflicts between Pages Router and App Router
export async function middleware(req: NextRequest) {
  return NextResponse.next();
  
  // The code below is disabled until we fully migrate to App Router
  /*
  const res = NextResponse.next();
  
  try {
    // Create a Supabase client configured for the middleware
    const supabase = createMiddlewareClient({ req, res });
    
    // Refresh the session if it exists
    await supabase.auth.getSession();
    
    // Check if the request is for protected routes
    const path = req.nextUrl.pathname;
    const isAuth = path.startsWith('/auth') || path === '/login' || path === '/signup';
    const isProtected = !isAuth && 
                      !path.startsWith('/_next/') && 
                      !path.startsWith('/api/') && 
                      !path.includes('favicon.ico') &&
                      !path.includes('.js') &&
                      !path.includes('.css');
    
    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    const origin = req.nextUrl.origin;
    
    // Redirect based on authentication status
    if (isAuth && session) {
      // If user is authenticated and trying to access auth pages, redirect to home
      return NextResponse.redirect(new URL('/', origin));
    }
    
    if (isProtected && !session) {
      // If user is not authenticated and trying to access protected pages, redirect to login
      return NextResponse.redirect(new URL('/login', origin));
    }
  } catch (error) {
    console.error('Middleware error:', error);
  }
  
  return res;
  */
}

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public files (e.g. robots.txt)
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};