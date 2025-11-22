'use server';

import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, setAdminClaim } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idToken } = body;

    if (!idToken) {
      return new NextResponse(JSON.stringify({ error: 'ID token is required' }), { status: 400 });
    }
    
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const user = await adminAuth.getUser(decodedToken.uid);

    // If the user doesn't have an admin claim yet, set it.
    // This makes any new user created in Firebase Auth an admin on first login.
    if (user.customClaims?.admin !== true) {
        await setAdminClaim(user.uid);
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    cookies().set('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    
    return new NextResponse(JSON.stringify({ status: 'success' }), { status: 200 });

  } catch (error: any) {
    console.error("Login API Error:", error);
    return new NextResponse(JSON.stringify({ error: 'Authentication failed', details: error.message }), { status: 401 });
  }
}
