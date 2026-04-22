"use client";

import React from 'react';
import { FiHeart, FiUser } from 'react-icons/fi';
import Link from 'next/link';

const CreditsPage = () => {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-4 tracking-tighter">
        <FiHeart className="text-red-600 fill-red-600 animate-pulse" />
        Credits
      </h1>
      <div className="space-y-12 transition-colors duration-300">
        <section>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-[10px]">Development Team</h2>
          <div className="flex items-center gap-6 bg-white dark:bg-red-950/20 p-8 rounded-[40px] border border-slate-200 dark:border-red-500/20 shadow-xl shadow-red-600/5">
            <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
              <FiUser className="w-10 h-10" />
            </div>
            <div>
              <p className="font-black text-2xl text-slate-900 dark:text-white tracking-tighter">Dhruv Das</p>
              <p className="text-slate-500 dark:text-slate-400 font-semibold italic">Lead Developer & Designer</p>
              <div className="mt-3 space-y-1">
                <p className="text-red-600 dark:text-red-400 font-black text-xs tracking-widest">dhruvdas006@gmail.com</p>
                <p className="text-black dark:text-white text-xs font-bold font-mono r">+91 8092404100</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-[10px]">Technologies Used</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Next.js 15', 'React 19', 'Tailwind CSS v4', 'React-Icons', 'Vercel', 'Next Themes'].map((tech) => (
              <div key={tech} className="px-6 py-4 rounded-2xl bg-slate-50 dark:bg-red-950/10 text-slate-700 dark:text-slate-300 text-xs font-black uppercase tracking-widest flex items-center justify-center border border-slate-200 dark:border-red-500/20 shadow-sm transition-all hover:scale-105 active:scale-95">
                {tech}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Special Thanks</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Special thanks to the Open Source community for providing the amazing tools that make projects like D-Code possible.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-12 border-t border-slate-200 dark:border-red-900/20">
        <Link href="/" className="text-red-600 dark:text-red-400 font-black text-sm uppercase tracking-widest hover:underline underline-offset-4">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CreditsPage;
