import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { hash } from '@node-rs/bcrypt';

export async function POST(req: Request) {
  try {
    const { username, newPassword } = await req.json();

    // Hash new password (using high-performance @node-rs/bcrypt)
    const hashedPassword = await hash(newPassword, 10);

    // Update password (using returning to check if user existed)
    const result = await db.update(users)
      .set({ password: hashedPassword, updatedAt: new Date() })
      .where(eq(users.username, username))
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Password updated successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
