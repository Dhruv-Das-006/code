"use client";

import React from 'react';
import { FiMail, FiMessageSquare, FiTwitter, FiPhone, FiChevronRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

const SupportPage = () => {
  const methods = [
    { title: "Email Support", desc: "Response within 24 hours", icon: <FiMail />, action: "support@dcode.dev" },
    { title: "Live Chat", desc: "Average wait: 2 mins", icon: <FiMessageSquare />, action: "Launch Chat" },
    { title: "Twitter DMs", desc: "For quick updates", icon: <FiTwitter />, action: "@DCodeApp" },
    { title: "Phone", desc: "Pro & Enterprise only", icon: <FiPhone />, action: "Request Callback" },
  ];

  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl">
      <div className="text-center mb-20 animate-in fade-in duration-700">
        <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight">
          We're here to <span className="text-indigo-600">Help.</span>
        </h1>
        <p className="text-xl text-zinc-500 dark:text-zinc-400">Our team is ready to assist you with any questions or issues.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {methods.map((method) => (
          <div
            key={method.title}
            onClick={() => toast.success(`${method.title} request sent!`)}
            className="group p-8 rounded-[40px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 transition-all cursor-pointer flex items-center justify-between shadow-sm hover:shadow-xl hover:shadow-indigo-500/5"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 text-indigo-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                {method.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{method.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{method.desc}</p>
              </div>
            </div>
            <FiChevronRight className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
          </div>
        ))}
      </div>

      <div className="p-12 rounded-[50px] bg-zinc-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Visit our Help Center</h2>
        <p className="text-zinc-400 mb-8 max-w-lg mx-auto">Browse through hundreds of articles and community discussions to find instant answers.</p>
        <button className="px-10 py-4 bg-indigo-600 rounded-full font-bold hover:bg-indigo-700 transition-colors">Go to Knowledge Base</button>
      </div>
    </div>
  );
};

export default SupportPage;
