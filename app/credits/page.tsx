"use client";

import React from 'react';
import { FiHeart, FiCode, FiUser } from 'react-icons/fi';
import Link from 'next/link';

const CreditsPage = () => {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-8 flex items-center gap-3">
        <FiHeart className="text-red-500 fill-red-500" />
        Credits
      </h1>
      
      <div className="space-y-12 transition-colors duration-300">
        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Development Team</h2>
          <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-100 dark:shadow-none">
            <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              <FiUser className="w-8 h-8" />
            </div>
            <div>
              <p className="font-bold text-xl text-zinc-900 dark:text-white">Dhruv Das</p>
              <p className="text-zinc-500 dark:text-zinc-400">Lead Developer & Designer</p>
              <div className="mt-2 text-xs space-y-1">
                <p className="text-indigo-600 dark:text-indigo-400 font-medium whitespace-nowrap">dhruvdas006@gmail.com</p>
                <p className="text-zinc-400">+91 8092404100</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Technologies Used</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Next.js 15', 'React 19', 'Tailwind CSS v4', 'Lucide Icons', 'Vercel', 'Next Themes'].map((tech) => (
              <div key={tech} className="px-4 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
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

      <div className="mt-12 pt-12 border-t border-zinc-200 dark:border-zinc-800">
        <Link href="/" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CreditsPage;
