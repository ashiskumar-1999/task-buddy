import { NextRequest, NextResponse } from 'next/server';
import { authTable, userTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { generateToken, comparePassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and Password are required.' },
      { status: 400 }
    );
  }
  try {
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Find user
    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));
    if (user.length === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    //check if user has auth record
    const auth = await db
      .select()
      .from(authTable)
      .where(eq(authTable.user_id, user[0].id));
    if (auth.length === 0) {
      return NextResponse.json(
        { error: 'No auth record found' },
        { status: 401 }
      );
    }

    const isPasswordValid = await comparePassword(password, auth[0].password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = generateToken({ userId: user[0].id, email: user[0].email });
    const refresh_token = crypto.randomUUID(); // Generate a random refresh token
    await db
      .update(authTable)
      .set({
        refresh_token,
        refresh_token_expires_at: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ), // 7 days
      })
      .where(eq(authTable.user_id, user[0].id));
    return NextResponse.json({
      message: 'Signin successful',
      token,
      user: user[0],
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
