"use client";

import React from 'react';
import Link from 'next/link';
import { FiPlay, FiZap, FiLayout, FiGlobe, FiCpu } from 'react-icons/fi';

const Home = () => {
  const cards = [
    {
      title: "Real-time Collaboration",
      desc: "Code together with your team in real-time with zero latency. Share links and start coding.",
      icon: <FiZap className="w-8 h-8" />,
      color: "bg-blue-500",
    },
    {
      title: "Fast Compilation",
      desc: "Instant feedback for HTML, CSS, and JS. See your changes reflected immediately as you type.",
      icon: <FiCpu className="w-8 h-8" />,
      color: "bg-purple-500",
    },
    {
      title: "Responsive Previews",
      desc: "Test your code across various screen sizes with built-in device simulation tools.",
      icon: <FiLayout className="w-8 h-8" />,
      color: "bg-pink-500",
    },
    {
      title: "Cloud Sync",
      desc: "Save your projects to the cloud and access them from anywhere in the world, on any device.",
      icon: <FiGlobe className="w-8 h-8" />,
      color: "bg-emerald-500",
    }
  ];

  return (
    <div className="relative isolate">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Decorative Gradients */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 -right-4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/10 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6 border border-indigo-100 dark:border-indigo-900/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            v2.0 is now live!
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]">
            Build your next <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600">
              masterpiece online.
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
            D-Code is the most advanced online coding environment designed for modern developers who demand speed, reliability, and beauty.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/editor"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-lg shadow-indigo-600/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <FiPlay className="w-5 h-5 fill-current" />
              Start Coding Now
            </Link>
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-bold text-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-20 bg-zinc-50/50 dark:bg-zinc-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              Powerful Features for Pro Developers
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Everything you need to create, test, and share your code effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cards.map((card, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col items-start gap-4"
              >
                <div className={`p-4 rounded-2xl ${card.color} text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-2">
                  {card.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;