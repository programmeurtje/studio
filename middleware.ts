
import { NextResponse, type NextRequest } from 'next/server';

// This middleware is now much simpler. It only checks for the presence of the session cookie.
// The actual validation of the cookie is done on the client-side by the AdminLayout,
// which calls an API route.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session');

  // If the request is for an admin page (but not the login page itself)
  // and the session cookie doesn't exist, redirect to the login page.
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login') && !sessionCookie) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If the user is logged in (has a session cookie) and tries to visit the login page,
  // redirect them to the admin dashboard. The layout will handle re-verification.
  if (pathname.startsWith('/admin/login') && sessionCookie) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // We match all admin routes and API routes related to auth.
  // This ensures the middleware runs where it's needed.
  matcher: ['/admin/:path*', '/api/auth/login', '/api/auth/logout'],
};
