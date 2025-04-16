import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Basic response
  const response = NextResponse.next()
  
  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/profile', '/settings']
  
  // Public routes that should redirect to dashboard if user is already logged in
  const authRoutes = ['/auth/signin', '/auth/signup']
  
  const { pathname } = request.nextUrl
  
  // Get the session cookie (Supabase stores auth in this cookie)
  const authCookie = request.cookies.get('sb-auth-token')
  const isAuthenticated = !!authCookie

  // Check if the route is protected and user is not authenticated
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
    // Redirect to login page
    const redirectUrl = new URL('/auth/signin', request.url)
    redirectUrl.searchParams.set('redirectedFrom', pathname)
    return NextResponse.redirect(redirectUrl)
  }
  
  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (authRoutes.some(route => pathname === route) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}