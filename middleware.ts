import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');
  const isApiProtected = request.nextUrl.pathname.startsWith('/api/bmi') || request.nextUrl.pathname.startsWith('/api/daily') || request.nextUrl.pathname.startsWith('/api/goals');

  if ((isDashboard || isApiProtected) && !token) {
    const loginUrl = new URL('/sign-in', request.url);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/bmi/:path*', '/api/daily/:path*', '/api/goals/:path*']
};
