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
        <h1 className="text-5xl md:text-[5.5rem] font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-tight">API Reference</h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl font-semibold tracking-tight">Integrate D-Code's powerful engine into your own products and workflows.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter uppercase text-xs tracking-widest">Popular Endpoints</h2>
          {endpoints.map((ep) => (
            <div key={ep.name} className="p-6 rounded-3xl bg-white dark:bg-red-950/20 border border-slate-200 dark:border-red-500/20 flex items-center justify-between group cursor-pointer hover:border-red-500 transition-all shadow-sm hover:shadow-xl hover:shadow-red-500/5 transition-all">
              <div className="flex items-center gap-6">
                <span className={`px-4 py-1.5 rounded-xl text-xs font-black ${
                  ep.method === 'GET' ? 'bg-blue-100 text-blue-600' : 
                  ep.method === 'POST' ? 'bg-emerald-100 text-emerald-600' : 
                  'bg-amber-100 text-amber-600'
                }`}>
                  {ep.method}
                </span>
                <div>
                  <h3 className="font-black text-slate-900 dark:text-white tracking-tight">{ep.name}</h3>
                  <code className="text-[11px] text-red-600 bg-red-50 dark:bg-red-900/40 px-2 py-0.5 rounded-md font-mono mt-1.5 block w-fit">{ep.path}</code>
                </div>
              </div>
              <FiChevronRight className="text-slate-400 group-hover:translate-x-1 group-hover:text-red-500 transition-all" />
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="p-8 rounded-[40px] bg-red-600 text-white shadow-2xl shadow-red-600/25 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(255,255,255,0.2),transparent)] pointer-events-none" />
            <FiCpu className="w-10 h-10 mb-6 relative z-10" />
            <h3 className="text-xl font-black mb-3 relative z-10 tracking-tight">SDKs for every stack</h3>
            <p className="text-red-100 text-sm mb-6 leading-relaxed relative z-10 font-semibold">
              We provide officially supported libraries for Node.js, Python, Go, and Ruby to get you up and running in minutes.
            </p>
            <button className="w-full py-4 bg-white text-red-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all relative z-10">View All SDKs</button>
          </div>
          
          <div className="p-8 rounded-[40px] bg-white dark:bg-red-950/10 border border-slate-200 dark:border-red-500/20 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Authentication</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-semibold tracking-tight">Learn how to authenticate your requests using Bearer tokens and API keys.</p>
            <button className="text-red-600 dark:text-red-400 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:underline underline-offset-4">
              Read Auth Docs <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocsPage;
