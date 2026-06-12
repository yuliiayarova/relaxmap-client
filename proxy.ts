import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';
import { refreshSessionServer } from './lib/api/server/authApiServer';

const PRIVATE_ROUTE = '/locations/add';
const CLOSED_TO_AUTHED = ['/login', '/register'];

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const { pathname } = request.nextUrl;
  const isPrivateRoute = pathname === PRIVATE_ROUTE;
  const isClosedToAuthedRoute = CLOSED_TO_AUTHED.includes(pathname);

  if (!accessToken && refreshToken) {
    try {
      const data = await refreshSessionServer();
      const setCookie = data.headers?.['set-cookie'];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path || '/',
            maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
          };

          if (parsed.accessToken) {
            cookieStore.set('accessToken', parsed.accessToken, options);
            accessToken = parsed.accessToken;
          }
          if (parsed.refreshToken)
            cookieStore.set('refreshToken', parsed.refreshToken, options);
          if (parsed.sessionId)
            cookieStore.set('sessionId', parsed.sessionId, options);
        }

        if (isClosedToAuthedRoute) {
          return NextResponse.redirect(new URL('/', request.nextUrl));
        }
      }
    } catch {
      cookieStore.delete('accessToken');
      cookieStore.delete('refreshToken');
      cookieStore.delete('sessionId');
      accessToken = undefined;

      if (isPrivateRoute) {
        const response = NextResponse.redirect(
          new URL('/login', request.nextUrl),
        );
        response.cookies.delete('accessToken');
        response.cookies.delete('refreshToken');
        response.cookies.delete('sessionId');
        return response;
      }
    }
  }

  if (!accessToken) {
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    return NextResponse.next();
  }

  if (isClosedToAuthedRoute) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/locations',
    '/locations/:path*',
    '/profile/:path*',
  ],
};
