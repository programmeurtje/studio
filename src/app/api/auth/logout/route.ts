import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    cookies().delete('session');
    return new NextResponse(JSON.stringify({ status: 'success' }), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Logout failed' }), { status: 500 });
  }
}
