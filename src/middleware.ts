import { NextResponse, type NextRequest } from 'next/server';

// This middleware is now only responsible for checking if a session cookie *exists*.
// It does NOT verify the cookie. Verification happens in the AdminLayout server component.
// This avoids pulling firebase-admin into the Edge runtime and prevents the crash.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the request is for an admin page, check for the session cookie.
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionCookie = request.cookies.get('session');
    
    // If the cookie doesn't exist, redirect to the login page.
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // If already on the login page, check if a cookie exists.
  // If so, redirect to the dashboard. This prevents a logged-in user from seeing the login page.
  if (pathname === '/admin/login') {
    const sessionCookie = request.cookies.get('session');
    if (sessionCookie) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths in the admin section
  matcher: ['/admin/:path*'],
};
