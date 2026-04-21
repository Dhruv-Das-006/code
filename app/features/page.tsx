"use client";

import React from 'react';
import { FiZap, FiCpu, FiGlobe, FiLayout, FiShield, FiUsers, FiClock, FiSettings } from 'react-icons/fi';

const FeaturesPage = () => {
  const features = [
    {
      title: "Real-time Sync",
      desc: "Instant synchronization across all your devices and collaborators. No more manual saves.",
      icon: <FiZap className="w-8 h-8" />,
      color: "bg-blue-500"
    },
    {
      title: "Powerful Compiler",
      desc: "Optimized build engine for HTML, CSS, and JS with instant live updates and HMR.",
      icon: <FiCpu className="w-8 h-8" />,
      color: "bg-indigo-500"
    },
    {
      title: "Global CDN",
      desc: "Your apps are hosted on a lightning-fast global edge network for minimum latency.",
      icon: <FiGlobe className="w-8 h-8" />,
      color: "bg-emerald-500"
    },
    {
      title: "Responsive Previews",
      desc: "Built-in device simulation tools to test your work across mobile, tablet, and desktop.",
      icon: <FiLayout className="w-8 h-8" />,
      color: "bg-pink-500"
    },
    {
      title: "Enterprise Security",
      desc: "Bank-grade encryption for your source code and data. Two-factor authentication supported.",
      icon: <FiShield className="w-8 h-8" />,
      color: "bg-red-500"
    },
    {
      title: "Team Collaboration",
      desc: "Invite colleagues, share live editing sessions, and manage permissions effortlessly.",
      icon: <FiUsers className="w-8 h-8" />,
      color: "bg-purple-500"
    },
    {
      title: "Version History",
      desc: "Automatic snapshots of your code so you can revert back to any point in time.",
      icon: <FiClock className="w-8 h-8" />,
      color: "bg-amber-500"
    },
    {
      title: "Custom Themes",
      desc: "Personalize your editing environment with dozens of custom dark and light themes.",
      icon: <FiSettings className="w-8 h-8" />,
      color: "bg-teal-500"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
          Unmatched <span className="text-red-600">Capabilities.</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
          D-Code provides a complete suite of professional tools built right into your browser. 
          Stop configuring and start creating.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="group p-8 rounded-[40px] glass-card-red backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/10"
          >
            <div className={`w-16 h-16 rounded-3xl ${feature.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20 p-12 rounded-[50px] bg-red-600 text-white flex flex-col items-center text-center shadow-2xl shadow-red-600/20">
        <h2 className="text-3xl font-black mb-4">Ready to experience the future?</h2>
        <p className="text-red-100 mb-8 max-w-xl">
          Join thousands of developers using D-Code every day to build incredible projects.
        </p>
        <button className="px-10 py-5 bg-white text-red-600 font-black rounded-full hover:scale-105 transition-transform active:scale-95 shadow-xl">
          Get Started for Free
        </button>
      </div>
    </div>
  );
};

export default FeaturesPage;
