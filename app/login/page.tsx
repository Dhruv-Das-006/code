"use client";

import React from 'react';
import Link from 'next/link';
import { FiCode, FiMail, FiLock } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const handleComingSoon = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Login coming soon!", {
      icon: '🔐',
      id: "login-toast",
    });
  };

  const handleGoogleClick = () => {
    toast.success("Google Login coming soon!", {
      icon: '🌐',
      id: "google-auth-toast",
    });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="w-full max-w-[420px] bg-white dark:bg-zinc-900 aspect-square flex flex-col items-center justify-center p-8 rounded-[40px] shadow-2xl shadow-zinc-200 dark:shadow-none border border-zinc-100 dark:border-zinc-800">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 rounded-2xl bg-indigo-600 text-white mb-4">
            <FiCode className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Welcome Back</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Please enter your details</p>
        </div>

        {/* Form */}
        <form onSubmit={handleComingSoon} className="w-full space-y-4">
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="email"
              required
              placeholder="name@example.com"
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm transition-all text-zinc-900 dark:text-white"
              aria-label="Email Address"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm transition-all text-zinc-900 dark:text-white"
              aria-label="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-95 mt-2"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="w-full flex items-center gap-4 my-6">
          <div className="h-px grow bg-zinc-200 dark:bg-zinc-800"></div>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold text-[10px]">OR</span>
          <div className="h-px grow bg-zinc-200 dark:bg-zinc-800"></div>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleClick}
          className="w-full py-3.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
        >
          <FcGoogle className="w-5 h-5" />
          Continue with Google
        </button>

        {/* Footer Link */}
        <p className="mt-8 text-sm text-zinc-500 dark:text-zinc-400">
          Don't have an account?{' '}
          <Link href="/signup" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
