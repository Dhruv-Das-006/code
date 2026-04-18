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
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="p-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-8 animate-pulse">
        <FiCode className="w-16 h-16" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-4">
        The Editor is Coming Soon
      </h1>
      
      <p className="max-w-md text-zinc-600 dark:text-zinc-400 text-lg mb-10">
        We're working hard to bring you the best online coding experience. Stay tuned for a powerful, feature-rich editor!
      </p>

      <Link
        href="/"
        className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
      >
        <FiArrowLeft className="w-5 h-5" />
        Back to Home
      </Link>
    </div>
  );
};

export default EditorPage;
