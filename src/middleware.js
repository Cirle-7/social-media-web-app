import { NextResponse } from 'next/server';

export default function middleware(req) {
  // if (!req.cookies.RequestCookies) {
  //   const loginUrl = new URL('/', req.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: '/feed',
};
