import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken'); 

  if (!token && ['/','/income','/budget'].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url)); // Redirect to home page
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/income', '/budget', '/login'], // Include the login page in the matcher
};
