import { NextResponse } from 'next/server';

export function middleware(req) {
  const { cookies } = req;

  const token = cookies.jwt;

  if (!token) {
    const loginUrl = new URL('/', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/feed',
};
