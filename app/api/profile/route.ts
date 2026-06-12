import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { api } from '../api';
import { logErrorResponse } from '../_utils/utils';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const apiRes = await api.get('/users/profile', {
      headers: { Cookie: cookieStore.toString() },
    });

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      if (error.response?.status === 401) {
        const response = NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 },
        );
        response.cookies.set('accessToken', '', { maxAge: 0, path: '/' });
        response.cookies.set('refreshToken', '', { maxAge: 0, path: '/' });
        return response;
      }
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    
    const formData = await req.formData();

    const apiRes = await api.patch('/users/update-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Cookie: cookieStore.toString(), 
      },
    });

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();

    const apiRes = await api.delete('/users/delete-avatar', {
      headers: { Cookie: cookieStore.toString() },
    });

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

