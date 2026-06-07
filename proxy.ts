import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';
import { refreshSessionServer } from './lib/api/server/authApiServer';

const privateRoutes = ['/locations/add'];
const closedToAuthedRoutes = ['/login', '/register'];

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const { pathname } = request.nextUrl;
  const isPrivateRoute = privateRoutes.includes(pathname);
  const isClosedToAuthedRoute = closedToAuthedRoutes.includes(pathname);

  if (!accessToken) {
    if (refreshToken) {
      const data = await refreshSessionServer();
      const setCookie = data.headers['set-cookie'];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed['Max-Age']),
          };
          if (parsed.accessToken)
            cookieStore.set('accessToken', parsed.accessToken, options);
          if (parsed.refreshToken)
            cookieStore.set('refreshToken', parsed.refreshToken, options);
          if (parsed.sessionId)
            cookieStore.set('sessionId', parsed.sessionId, options);
        }

        if (isPrivateRoute) {
          return NextResponse.next({
            headers: { Cookie: cookieStore.toString() },
          });
        }
        if (isClosedToAuthedRoute) {
          return NextResponse.next({
            headers: { Cookie: cookieStore.toString() },
          });
        }
      }
    }

    // Немає аксес токена і рефреша
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    if (isClosedToAuthedRoute) {
      return NextResponse.next();
    }
  }
  // Якщо є токени
  if (isClosedToAuthedRoute) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/locations',
    '/locations/:path*',
    '/profile/:path*',
    '/locations/add',
  ],
};
