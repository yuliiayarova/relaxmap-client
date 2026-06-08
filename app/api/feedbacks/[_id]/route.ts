import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { api } from '../../api';
import { logErrorResponse } from '../../_utils/utils';

interface Props {
  params: Promise<{ _id: string }>;
}

export async function POST(req: NextRequest, { params }: Props) {
  try {
    const body = await req.json();
    const { _id } = await params;
    const cookieStore = await cookies();
    const apiRes = await api.post(`/feedbacks/${_id}`, body, {
      headers: {
        Cookie: cookieStore.toString(),
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        { status: error.status },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
