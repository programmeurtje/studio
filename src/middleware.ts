
import { NextResponse, type NextRequest } from 'next/server';

// Deze middleware is nu veel simpeler. Het controleert alleen of de sessiecookie
// aanwezig is op admin-pagina's en stuurt de gebruiker door als dat niet het geval is.
// De daadwerkelijke verificatie van de cookie gebeurt client-side via een API-route.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session');

  // Als het een verzoek is voor een admin-pagina (maar niet de loginpagina zelf)
  // en de sessiecookie bestaat niet, stuur dan door naar de loginpagina.
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login') && !sessionCookie) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Als de gebruiker is ingelogd (heeft een sessiecookie) en de loginpagina probeert te bezoeken,
  // stuur ze dan naar het admin-dashboard. De layout zal de her-verificatie afhandelen.
  if (pathname.startsWith('/admin/login') && sessionCookie) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // BELANGRIJK: De matcher mag GEEN API-routes bevatten, omdat die
  // firebase-admin gebruiken, wat de Edge-runtime crasht.
  matcher: ['/admin/:path*'],
};
