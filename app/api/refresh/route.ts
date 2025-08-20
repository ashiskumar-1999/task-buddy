import { NextRequest, NextResponse } from 'next/server';
import { authTable, userTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { generateToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const { refresh_token } = await request.json();

  if (!refresh_token) {
    return NextResponse.json(
      { error: 'Refresh token is required.' },
      { status: 400 }
    );
  }

  try {
    //check if refresh token exists in the database
    const [checkRefreshToken] = await db
      .select()
      .from(authTable)
      .where(eq(authTable.refresh_token, refresh_token));

    //If no refresh token found
    if (!checkRefreshToken) {
      return NextResponse.json(
        { error: 'Invalid refresh token.' },
        { status: 401 }
      );
    }
    if (checkRefreshToken.refresh_token_expires_at < new Date()) {
      return NextResponse.json(
        { error: 'Refresh token has expired.' },
        { status: 401 }
      );
    }

    //check if user exists
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, checkRefreshToken.user_id));

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }
    // Generate new tokens
    const newRefreshToken = crypto.randomUUID();
    const newAccessToken = generateToken({
      userId: user.id,
      email: user.email,
    });

    await db
      .update(authTable)
      .set({
        refresh_token: newRefreshToken,
        refresh_token_expires_at: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
        ),
      })
      .where(eq(authTable.user_id, user.id));

    // Response with new tokens
    const response = NextResponse.json({
      message: 'New access token issued successfully.',
      cookies: {
        refresh_token: newRefreshToken,
      },
      user,
    });
    response.cookies.set('access_token', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
    return response;
  } catch (error) {
    console.error('Error during refresh token validation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
