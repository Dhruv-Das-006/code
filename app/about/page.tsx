"use client";

import React from 'react';
import { FiUsers, FiCode, FiAward, FiGlobe } from 'react-icons/fi';

const AboutPage = () => {
  const stats = [
    { label: "Active Users", value: "50K+", icon: <FiUsers /> },
    { label: "Lines of Code", value: "10M+", icon: <FiCode /> },
    { label: "Awards Won", value: "12", icon: <FiAward /> },
    { label: "Countries", value: "150+", icon: <FiGlobe /> },
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">
          About <span className="text-red-600">D-Code</span>
        </h1>
        
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12 leading-relaxed">
          Founded in 2024, D-Code was born out of a simple idea: making professional-grade coding tools accessible to everyone, anywhere. We believe that the browser is the future of development.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-3xl bg-slate-50 dark:bg-red-950/20 border border-slate-200 dark:border-red-500/20 shadow-sm hover:shadow-xl hover:shadow-red-500/5 transition-all">
              <div className="inline-flex p-3 rounded-2xl bg-red-600 text-white mb-4 shadow-lg shadow-red-600/20">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-black">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Our Mission</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-semibold tracking-tight">
              Our mission is to empower developers by providing a seamless, high-performance environment that removes the friction between inspiration and implementation. Whether you're a student writing your first line of code or a pro building a complex app, D-Code is here to support you.
            </p>
          </section>

          <section className="bg-linear-to-br from-red-600 to-rose-700 p-12 rounded-[40px] text-white shadow-2xl shadow-red-600/25 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(255,255,255,0.2),transparent)] pointer-events-none" />
            <h2 className="text-3xl font-black mb-4 relative z-10">Join our community</h2>
            <p className="text-red-100 mb-8 max-w-lg relative z-10 font-semibold">
              Help us shape the future of web development. Join thousands of developers who are already building with D-Code.
            </p>
            <button className="px-8 py-4 bg-white text-red-600 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl relative z-10">
              Get Started Now
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
