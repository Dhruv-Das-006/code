"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/authSlice';
import { FiCode, FiMail, FiLock, FiUser, FiArrowLeft, FiAtSign } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetStep, setResetStep] = useState(0); // 0: Login, 1: Username, 2: New Passwords
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [resetData, setResetData] = useState({
    username: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(setUser(data.user));
        toast.success("Welcome Back!");
        router.push('/editor');
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (resetStep === 1) {
      if (!resetData.username) {
        toast.error("Please enter your username");
        return;
      }
      setResetStep(2);
      return;
    }

    if (resetData.newPassword !== resetData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: resetData.username,
          newPassword: resetData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset successfully! Please login.");
        setIsResetting(false);
        setResetStep(0);
      } else {
        toast.error(data.error || "Reset failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleClick = () => {
    toast.success("Google Login coming soon!", {
      icon: '🌐',
      id: "google-auth-toast",
    });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-white dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden">
      <div className="w-full max-w-[480px] min-h-[650px] bg-white/40 dark:bg-red-950/20 backdrop-blur-2xl flex flex-col items-center justify-center p-10 sm:p-14 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(239,68,68,0.15)] dark:shadow-red-500/10 border-2 border-red-400 dark:border-red-500/40 relative z-10 overflow-hidden">
        {/* Subtle Gradient Glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full blur-[40px]" />
        
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="p-3.5 rounded-2xl bg-red-600 text-white mb-5 shadow-xl shadow-red-600/20">
            <FiCode className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter">
            {isResetting ? 'Reset Password' : 'Welcome Back'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-semibold tracking-tight">
            {isResetting 
              ? (resetStep === 1 ? 'Enter your username to continue' : 'Set your new password')
              : 'Please enter your details to continue'
            }
          </p>
        </div>

        {!isResetting ? (
          /* Login Form */
          <form onSubmit={handleLogin} className="w-full space-y-4">
            <div className="relative group">
              <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-full pl-14 pr-6 py-4 rounded-full bg-white/50 dark:bg-slate-800/30 border border-red-200 dark:border-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500/50 dark:focus:ring-red-400/50 text-sm transition-all text-slate-900 dark:text-white font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm"
                aria-label="Email Address"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex justify-end">
                <button 
                  type="button"
                  onClick={() => { setIsResetting(true); setResetStep(1); }}
                  className="text-xs font-bold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative group">
                <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full pl-14 pr-6 py-4 rounded-full bg-white/50 dark:bg-slate-800/30 border border-red-200 dark:border-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500/50 dark:focus:ring-red-400/50 text-sm transition-all text-slate-900 dark:text-white font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm"
                  aria-label="Password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-red-600/20 transition-all hover:scale-[1.02] active:scale-95 mt-4 disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        ) : (
          /* Reset Password Form */
          <form onSubmit={handleResetPassword} className="w-full space-y-4">
            {resetStep === 1 ? (
              <div className="relative group">
                <FiAtSign className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" />
                <input
                  type="text"
                  required
                  placeholder="Enter Username"
                  value={resetData.username}
                  onChange={(e) => setResetData({ ...resetData, username: e.target.value })}
                  className="w-full pl-14 pr-6 py-4 rounded-full bg-white/50 dark:bg-slate-800/30 border border-red-200 dark:border-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500/50 dark:focus:ring-red-400/50 text-sm transition-all text-slate-900 dark:text-white font-medium shadow-sm"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative group">
                  <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" />
                  <input
                    type="password"
                    required
                    placeholder="New Password"
                    value={resetData.newPassword}
                    onChange={(e) => setResetData({ ...resetData, newPassword: e.target.value })}
                    className="w-full pl-14 pr-6 py-4 rounded-full bg-white/50 dark:bg-slate-800/30 border border-red-200 dark:border-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500/50 dark:focus:ring-red-400/50 text-sm transition-all text-slate-900 dark:text-white font-medium shadow-sm"
                  />
                </div>
                <div className="relative group">
                  <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" />
                  <input
                    type="password"
                    required
                    placeholder="Verify Password"
                    value={resetData.confirmPassword}
                    onChange={(e) => setResetData({ ...resetData, confirmPassword: e.target.value })}
                    className="w-full pl-14 pr-6 py-4 rounded-full bg-white/50 dark:bg-slate-800/30 border border-red-200 dark:border-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500/50 dark:focus:ring-red-400/50 text-sm transition-all text-slate-900 dark:text-white font-medium shadow-sm"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-red-600/20 transition-all hover:scale-[1.02] active:scale-95 mt-4 disabled:opacity-50"
            >
              {loading ? 'Processing...' : (resetStep === 1 ? 'Continue' : 'Reset Password')}
            </button>

            <button
              type="button"
              onClick={() => { setIsResetting(false); setResetStep(0); }}
              className="w-full py-4 flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-red-500 transition-colors"
            >
              <FiArrowLeft /> Back to Login
            </button>
          </form>
        )}

        {!isResetting && (
          <>
            {/* Divider */}
            <div className="w-full flex items-center gap-5 my-8">
              <div className="h-px grow bg-slate-200 dark:bg-slate-800"></div>
              <span className="text-[10px] text-slate-500 dark:text-slate-500 uppercase tracking-[0.2em] font-black">OR</span>
              <div className="h-px grow bg-slate-200 dark:bg-slate-800"></div>
            </div>

            {/* Google Button */}
            <button
              onClick={handleGoogleClick}
              className="w-full py-4 rounded-full bg-white/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 font-bold text-sm uppercase tracking-widest hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-sm"
            >
              <FcGoogle className="w-6 h-6" />
              Continue with Google
            </button>
          </>
        )}

        {/* Footer Link */}
        <p className="mt-10 text-sm text-slate-500 dark:text-slate-500 font-medium">
          Don't have an account?{' '}
          <Link href="/signup" className="text-red-600 dark:text-red-400 font-black hover:underline underline-offset-4">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

