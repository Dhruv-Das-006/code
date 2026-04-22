"use client";

import React, { useEffect } from 'react';
import { FiCode, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import toast from 'react-hot-toast';

const EditorPage = () => {
  useEffect(() => {
    toast.success("Editor environment loading...", {
      icon: '🛠️',
      id: "editor-toast",
    });
  }, []);

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      
      <div className="p-10 rounded-[3rem] bg-white/40 dark:bg-red-950/20 backdrop-blur-2xl border border-red-500/10 dark:border-white shadow-2xl shadow-red-600/5 mb-12 group transition-all duration-700 hover:scale-105">
        <FiCode className="w-20 h-20 text-red-600 dark:text-red-400 group-hover:rotate-12 transition-transform duration-700" />
      </div>
      
      <h1 className="text-6xl md:text-8xl font-black text-slate-950 dark:text-white mb-6 tracking-tighter leading-tight">
        The Editor is <br /> <span className="text-red-600">Coming Soon</span>
      </h1>
      
      <p className="max-w-xl text-slate-600 dark:text-slate-400 text-xl mb-12 font-semibold tracking-tight leading-relaxed">
        We're precision-engineering the most powerful online coding experience ever built. Stay tuned for a tool that matches your ambition.
      </p>

      <Link
        href="/"
        className="flex items-center gap-3 px-8 py-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all duration-500 shadow-sm hover:shadow-red-600/20"
      >
        <FiArrowLeft className="w-5 h-5" />
        Back to Home
      </Link>
    </div>
  );
};

export default EditorPage;
