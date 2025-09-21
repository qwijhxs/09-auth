import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { checkSession } from './lib/api/serverApi';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const publicRoutes = ['/sign-in', '/sign-up'];
  const privateRoutes = ['/profile', '/notes'];

  let isAuthenticated = !!accessToken;

  if (!accessToken && refreshToken) {
    try {
      const sessionResponse = await checkSession();
      
      if (sessionResponse.data?.accessToken) {
        const response = NextResponse.next();

        response.cookies.set('accessToken', sessionResponse.data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        });
        
        if (sessionResponse.data.refreshToken) {
          response.cookies.set('refreshToken', sessionResponse.data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
          });
        }

        isAuthenticated = true;
        return response;
      }
    } catch (error) {
      console.error('Session refresh failed:', error);
      const response = NextResponse.next();
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
    }
  }

  if (isAuthenticated && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isAuthenticated && privateRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/notes/:path*', 
    '/sign-in',
    '/sign-up',
    '/'
  ],
};