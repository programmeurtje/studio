'use server';

import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const sessionCookie = cookies().get('session')?.value;

  if (!sessionCookie) {
    return new NextResponse(JSON.stringify({ isAdmin: false, error: 'No session cookie found.' }), { status: 401 });
  }

  try {
    const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);

    if (decodedToken.admin !== true) {
      return new NextResponse(JSON.stringify({ isAdmin: false, error: 'User is not an admin.' }), { status: 403 });
    }
    
    // User is a verified admin
    return new NextResponse(JSON.stringify({ isAdmin: true, uid: decodedToken.uid }), { status: 200 });

  } catch (error: any) {
    // Session cookie is invalid or expired.
    // Advise client to clear cookie and redirect to login
    return new NextResponse(JSON.stringify({ isAdmin: false, error: 'Invalid session cookie.' }), { status: 401 });
  }
}
