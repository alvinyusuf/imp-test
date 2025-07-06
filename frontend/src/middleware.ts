import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;

  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth');

  if (!token && !isAuthRoute) {
    return NextResponse.redirect(
      new URL('/auth/login', request.url),
    );
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(
      new URL('/', request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};
