import { NextResponse } from 'next/server';

export default async function middleware(req) {
  const token = await req.cookies.get('token')?.value;
  const pathName = req.nextUrl.pathname;

  if (!token && pathName !== '/login') {
    if(pathName !== '/signup') {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if ((token && pathName === '/login') || (token && pathName === '/signup')) {
    const feedUrl = new URL('/feed', req.url);
    return NextResponse.redirect(feedUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/feed', '/profile', '/messages', '/login', '/signup'],
};
