import { NextResponse, type NextRequest } from 'next/server';

// Deze middleware is nu veel simpeler. Het controleert alleen op de aanwezigheid van de sessie-cookie.
// De daadwerkelijke validatie van de cookie wordt gedaan in de `AdminLayout` server component.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Als de request voor een admin pagina is en niet de login pagina zelf
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionCookie = request.cookies.get('session');

    // Als de sessie-cookie niet bestaat, stuur door naar de login pagina.
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Als de gebruiker ingelogd is (heeft een sessie-cookie) en probeert de login-pagina te bezoeken,
  // stuur ze dan door naar het admin dashboard.
  if (pathname === '/admin/login') {
    const sessionCookie = request.cookies.get('session');
    if (sessionCookie) {
      // We hoeven de cookie hier niet te verifiëren, alleen doorsturen.
      // Als de cookie ongeldig is, zal `AdminLayout` dit opvangen en terugsturen naar de login.
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
