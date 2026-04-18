"use client";

import React from 'react';
import { FiCpu, FiCode, FiDatabase, FiCloud, FiChevronRight } from 'react-icons/fi';

const ApiDocsPage = () => {
  const endpoints = [
    { name: "List Projects", method: "GET", path: "/v1/projects" },
    { name: "Create Snippet", method: "POST", path: "/v1/snippets" },
    { name: "Run Code", method: "POST", path: "/v1/execute" },
    { name: "User Settings", method: "PATCH", path: "/v1/user/config" },
  ];

  return (
    <div className="container mx-auto px-4 py-20 max-w-6xl">
      <div className="mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase mb-6 tracking-widest border border-emerald-100 dark:border-emerald-900/30">
          API v1.4.0
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-6">API Reference</h1>
        <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl">Integrate D-Code's powerful engine into your own products and workflows.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Popular Endpoints</h2>
          {endpoints.map((ep) => (
            <div key={ep.name} className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between group cursor-pointer hover:border-indigo-500 transition-all">
              <div className="flex items-center gap-6">
                <span className={`px-4 py-1.5 rounded-xl text-xs font-black ${
                  ep.method === 'GET' ? 'bg-blue-100 text-blue-600' : 
                  ep.method === 'POST' ? 'bg-emerald-100 text-emerald-600' : 
                  'bg-amber-100 text-amber-600'
                }`}>
                  {ep.method}
                </span>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white">{ep.name}</h3>
                  <code className="text-sm text-zinc-500 font-mono mt-1 block">{ep.path}</code>
                </div>
              </div>
              <FiChevronRight className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="p-8 rounded-[40px] bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20">
            <FiCode className="w-10 h-10 mb-6" />
            <h3 className="text-xl font-bold mb-3">SDKs for every stack</h3>
            <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
              We provide officially supported libraries for Node.js, Python, Go, and Ruby to get you up and running in minutes.
            </p>
            <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-zinc-100 transition-all">View All SDKs</button>
          </div>
          
          <div className="p-8 rounded-[40px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Authentication</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Learn how to authenticate your requests using Bearer tokens and API keys.</p>
            <button className="text-indigo-600 dark:text-indigo-400 font-bold text-sm flex items-center gap-2 hover:underline">
              Read Auth Docs <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocsPage;
