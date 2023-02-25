import { NextResponse } from 'next/server';

export default async function middleware(req) {
  const token = await req.cookies.get('token')?.value;

  if (!token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/feed', '/profile', '/messages'],
};
