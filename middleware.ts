import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Minimal pass-through middleware.
  // Authentication/middleware behavior was removed for static deployment.
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all request paths except Next static/assets and public files
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}