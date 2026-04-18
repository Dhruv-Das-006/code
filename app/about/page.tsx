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
        <h1 className="text-5xl font-extrabold text-zinc-900 dark:text-white mb-8">
          About <span className="text-indigo-600">D-Code</span>
        </h1>
        
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12 leading-relaxed">
          Founded in 2024, D-Code was born out of a simple idea: making professional-grade coding tools accessible to everyone, anywhere. We believe that the browser is the future of development.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="inline-flex p-3 rounded-2xl bg-indigo-600 text-white mb-4 shadow-lg shadow-indigo-600/20">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
              Our mission is to empower developers by providing a seamless, high-performance environment that removes the friction between inspiration and implementation. Whether you're a student writing your first line of code or a pro building a complex app, D-Code is here to support you.
            </p>
          </section>

          <section className="bg-linear-to-br from-indigo-600 to-purple-700 p-12 rounded-[40px] text-white shadow-2xl shadow-indigo-600/25">
            <h2 className="text-3xl font-bold mb-4">Join our community</h2>
            <p className="text-indigo-100 mb-8 max-w-lg">
              Help us shape the future of web development. Join thousands of developers who are already building with D-Code.
            </p>
            <button className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold hover:scale-105 transition-transform">
              Get Started Now
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
