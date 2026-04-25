import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export default async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  // Paths that require authentication
  const protectedPaths = ['/editor', '/live-preview'];

  const isProtected = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

  if (isProtected && !token) {
    // We don't show the toast here because middleware runs on server
    // The Navbar already handles the "first login" toast for clicks
    // This is a safety redirect for direct URL access
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/editor/:path*', '/live-preview/:path*'],
};
