import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

async function verifyToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  if (!path.startsWith('/admin')) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth_token')?.value;
  const isLoginPage = path === '/admin/login';

  if (token) {
    const isValid = await verifyToken(token);
    if (isValid && isLoginPage) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  } else if (!isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
