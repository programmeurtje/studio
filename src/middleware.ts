
import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Middleware is only for admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const sessionCookie = cookies().get('session')?.value;
  const loginUrl = new URL('/admin/login', request.url);

  // If no session cookie and not on the login page, redirect to login
  if (!sessionCookie && pathname !== '/admin/login') {
    return NextResponse.redirect(loginUrl);
  }

  try {
    // If there is a cookie, verify it
    if (sessionCookie) {
      const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);

      // If user is not an admin, redirect to login with an error
      if (decodedToken.admin !== true) {
        loginUrl.searchParams.set('error', 'auth-error');
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete('session'); // Clear the invalid cookie
        return response;
      }
      
      // If user is an admin and trying to access /admin/login, redirect to dashboard
      if (pathname === '/admin/login') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }

      // If everything is fine, proceed
      return NextResponse.next();
    }
  } catch (error) {
    // Session cookie is invalid (expired, malformed, etc.)
    // Redirect to login and clear the bad cookie
    loginUrl.searchParams.set('error', 'session-expired');
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('session');
    return response;
  }
  
  // If no cookie and on the login page, allow access
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Fallback redirect to login, should not be reached in normal flow
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*'],
};
