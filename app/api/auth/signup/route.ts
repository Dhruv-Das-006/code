import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { username, name, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or username already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      username,
      name,
      email,
      password: hashedPassword,
    });

    // Automatically log in after signup
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
      { expiresIn: '30d' }
    );

    const response = NextResponse.json(
      { 
        message: 'User created successfully', 
        user: { id: user._id, email: user.email, username: user.username, name: user.name } 
      },
      { status: 201 }
    );

    // Set cookie
    // Use VERCEL_ENV to determine if we are in production to satisfy the "no NODE_ENV" requirement
    const isProd = process.env.VERCEL_ENV === 'production' || !!process.env.VERCEL;
    
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: isProd,
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
