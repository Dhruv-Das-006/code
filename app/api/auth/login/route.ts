import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error('❌ JWT_SECRET is missing in environment variables');
      return NextResponse.json(
        { error: 'Authentication configuration error' },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json(
      { message: 'Login successful', user: { id: user._id, email: user.email, username: user.username, name: user.name } },
      { status: 200 }
    );

    // Set cookie
    // Use VERCEL_ENV to determine if we are in production to satisfy the "no NODE_ENV" requirement
    const isProd = process.env.VERCEL_ENV === 'production' || !!process.env.VERCEL;

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: isProd,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
