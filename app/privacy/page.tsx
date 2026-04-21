"use client";

import React from 'react';
import { FiShield, FiLock, FiEye, FiServer } from 'react-icons/fi';

const PrivacyPage = () => {
  return (
    <div className="container mx-auto px-4 py-20 animate-in fade-in duration-1000">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/20">
            <FiShield className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">Privacy Policy</h1>
        </div>

        <p className="text-zinc-500 dark:text-zinc-500 mb-12 text-sm font-bold uppercase tracking-widest">
          Last Updated: October 18, 2024
        </p>

        <div className="space-y-12 prose dark:prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <FiEye className="text-red-600" /> 1. Data Collection
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We collect information you provide directly to us when you create an account, such as your name, email address, and any code you save to our cloud environment. We also automatically collect certain technical information like your IP address and browser type to ensure the stability of our editor.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-3">
              <FiLock className="text-purple-600" /> 2. Security Measures
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Security is our top priority. We use bank-grade AES-256 encryption to protect your source code both in transit and at rest. Access to our servers is strictly controlled and monitored 24/7.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-3">
              <FiServer className="text-emerald-600" /> 3. Cookies and Tracking
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              D-Code uses essential cookies to keep you logged in and to remember your preferred editor theme and layout settings. We do not use third-party tracking cookies for advertising purposes.
            </p>
          </section>

          <section className="p-8 rounded-[40px] bg-slate-50 dark:bg-red-950/20 border border-slate-200 dark:border-red-500/20 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              If you have any questions about this Privacy Policy or how we handle your data, please contact our Data Protection Officer.
            </p>
            <button className="px-8 py-3 bg-red-600 text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg shadow-red-600/20">
              privacy@dcode.dev
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
