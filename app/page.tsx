"use client";

import React from 'react';
import Link from 'next/link';
import { FiPlay, FiZap, FiLayout, FiGlobe, FiCpu, FiShield, FiClock, FiSettings } from 'react-icons/fi';

const Home = () => {
  const cards = [
    {
      title: "Real-time Sync",
      desc: "Instant synchronization across all your devices and collaborators. No more manual saves.",
      icon: <FiZap />,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Powerful Compiler",
      desc: "Optimized build engine for HTML, CSS, and JS with instant live updates and HMR.",
      icon: <FiCpu />,
      color: "from-indigo-500 to-purple-600",
    },
    {
      title: "Global CDN",
      desc: "Your apps are hosted on a lightning-fast global edge network for minimum latency.",
      icon: <FiGlobe />,
      color: "from-emerald-400 to-emerald-600",
    },
    {
      title: "Responsive Previews",
      desc: "Built-in device simulation tools to test your work across mobile, tablet, and desktop.",
      icon: <FiLayout />,
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="relative isolate min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Decorative Gradients - Enhanced for Light Mode */}
        <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute top-1/4 -right-4 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-[140px] -z-10" />

        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50/80 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-widest mb-10 border border-red-100 dark:border-red-500/20 shadow-sm transition-all hover:scale-105 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            v2.0 is now live!
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-[10rem] font-black tracking-tighter text-slate-950 dark:text-white mb-10 leading-[0.85] filter drop-shadow-sm">
            Build your next <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 via-rose-500 to-orange-500 animate-gradient">
              masterpiece.
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-2xl text-slate-600 dark:text-slate-400 mb-14 leading-relaxed font-semibold tracking-tight">
            D-Code is a precision-engineered online coding environment designed for modern developers who demand speed, reliability, and beauty.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/editor"
              className="w-full sm:w-auto px-12 py-6 rounded-[2rem] bg-red-600 hover:bg-red-700 text-white font-black text-xl shadow-2xl shadow-red-600/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              <FiPlay className="w-6 h-6 fill-current" />
              Get Started
            </Link>
            <Link
              href="/signup"
              className="w-full sm:w-auto px-12 py-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-950 dark:text-white font-black text-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-slate-300 backdrop-blur-sm"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="mb-20 text-center">
            <h2 className="text-4xl sm:text-6xl md:text-[8rem] font-black text-slate-950 dark:text-white mb-10 tracking-tighter leading-[0.9]">
              Capabilities.
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-xl font-bold tracking-tight">
              Everything you need to create, test, and share your code effortlessly with a suite of professional tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cards.map((card, index) => (
              <div
                key={index}
                className="group relative p-12 rounded-[3.5rem] bg-white/60 dark:bg-slate-900/60 border border-red-50 dark:border-slate-800/50 backdrop-blur-xl transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(239,68,68,0.15)] dark:hover:shadow-red-500/10 flex flex-col items-start gap-8 hover:-translate-y-2 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              >
                <div className={`p-6 rounded-[1.8rem] bg-linear-to-br ${card.color} text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 shadow-xl shadow-red-500/10`}>
                  {React.cloneElement(card.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8" })}
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter">
                    {card.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-bold tracking-tight">
                    {card.desc}
                  </p>
                </div>
                {/* Decorative Icon Background */}
                <div className="absolute -bottom-6 -right-6 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 rotate-12 scale-150">
                   {React.cloneElement(card.icon as React.ReactElement<{ className?: string }>, { className: "w-32 h-32" })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;