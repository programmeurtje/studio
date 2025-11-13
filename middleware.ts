import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the request is for the admin section
  if (pathname.startsWith('/admin')) {
    const sessionCookie = cookies().get('session')?.value;

    // Redirect to login if trying to access admin pages without being on the login page itself
    if (!sessionCookie && pathname !== '/admin/login') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      if (sessionCookie) {
        const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
        
        // If user is authenticated
        if (decodedToken) {
          // If user is an admin, let them proceed
          if (decodedToken.admin === true) {
            // If they are trying to access /admin/login while logged in, redirect to dashboard
             if (pathname === '/admin/login') {
              return NextResponse.redirect(new URL('/admin', request.url));
            }
            return NextResponse.next();
          } else {
            // If user is not an admin, redirect to login with an error
            const loginUrl = new URL('/admin/login', request.url);
            loginUrl.searchParams.set('error', 'auth-error');
            return NextResponse.redirect(loginUrl);
          }
        }
      }
    } catch (error) {
      // Session cookie is invalid. Clear it and redirect to login.
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
