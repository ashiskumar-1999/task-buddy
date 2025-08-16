import { NextRequest, NextResponse } from 'next/server';
import { authTable, userTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { generateToken, hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  if (!email || !password || !name) {
    return NextResponse.json(
      { error: 'Name, Email, Password are required.' },
      { status: 400 }
    );
  }
  try {
    // Check if user already exists
    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));
    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create user
    const hashedPassword = await hashPassword(password);
    const newUser = await db
      .insert(userTable)
      .values({ name, email })
      .returning();

    // Create auth record
    await db.insert(authTable).values({
      user_id: newUser[0].id,
      password: hashedPassword,
      refresh_token: '', // we’ll handle refresh token later
      refresh_token_expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    const token = generateToken({ userId: newUser[0].id, email });

    return NextResponse.json({
      message: 'Signup successful',
      token,
      user: newUser[0],
    });
  } catch (error) {
    console.error('Error during authentication:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
