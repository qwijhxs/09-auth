import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  const publicRoutes = ['/sign-in', '/sign-up'];
  const privateRoutes = ['/profile', '/notes'];

  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  if (!token && privateRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};