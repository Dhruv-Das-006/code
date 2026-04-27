import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq, or } from 'drizzle-orm';
import { hash } from '@node-rs/bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const { username, name, email, password } = await req.json();

    // Hash password (using high-performance @node-rs/bcrypt)
    const hashedPassword = await hash(password, 10);

    // Create new user (handling unique constraint error)
    let newUser;
    try {
      const result = await db.insert(users).values({
        username,
        name,
        email,
        password: hashedPassword,
      }).returning();
      newUser = result[0];
    } catch (error: any) {
      if (error.code === '23505' || error.message?.includes('unique constraint')) {
        return NextResponse.json(
          { error: 'User with this email or username already exists' },
          { status: 400 }
        );
      }
      throw error;
    }

    // Automatically log in after signup
    const token = jwt.sign(
      { 
        userId: newUser.id, 
        email: newUser.email, 
        username: newUser.username,
        name: newUser.name 
      },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' }
    );

    const response = NextResponse.json(
      { 
        message: 'User created successfully', 
        user: { id: newUser.id, email: newUser.email, username: newUser.username, name: newUser.name } 
      },
      { status: 201 }
    );

    // Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
