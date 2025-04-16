import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'

// Temporarily using a simple middleware that just passes through
// until we resolve the environment variable issues
export async function middleware(request: NextRequest) {
  try {
    // For now, just return the next response
    return NextResponse.next()
    
    // When environment variables are properly set up, uncomment:
    // return await updateSession(request)
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}