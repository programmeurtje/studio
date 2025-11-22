import { NextResponse, type NextRequest } from 'next/server';

// This middleware is now much simpler. It only checks for the presence of the session cookie.
// The actual validation of the cookie is done in the `AdminLayout` server component.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the request is for an admin page and not the login page itself
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionCookie = request.cookies.get('session');

    // If the session cookie doesn't exist, redirect to the login page.
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // If the user is logged in (has a session cookie) and tries to access the login page,
  // redirect them to the admin dashboard.
  if (pathname === '/admin/login') {
    const sessionCookie = request.cookies.get('session');
    if (sessionCookie) {
      // We don't need to verify the cookie here, just redirect.
      // If the cookie is invalid, the `AdminLayout` will catch it and redirect back to login.
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
