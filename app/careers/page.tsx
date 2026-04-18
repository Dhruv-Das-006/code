"use client";

import React from 'react';
import { FiUsers, FiMapPin, FiBriefcase, FiArrowRight } from 'react-icons/fi';

const CareersPage = () => {
  const jobs = [
    { title: "Senior Frontend Engineer", dept: "Engineering", loc: "Remote / SF", type: "Full-time" },
    { title: "Backend Systems Architect", dept: "Engineering", loc: "Remote / London", type: "Full-time" },
    { title: "Product Designer", dept: "Design", loc: "Remote / NY", type: "Full-time" },
    { title: "Technical Content Writer", dept: "Marketing", loc: "Remote", type: "Part-time" },
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto text-center mb-20 animate-in fade-in zoom-in duration-700">
        <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-6">
          Join the <span className="text-indigo-600">Mission.</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          We're building the future of web development. Help us create tools that empower millions of developers worldwide.
        </p>
      </div>

      {/* Perks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32 max-w-6xl mx-auto">
        <div className="p-8 rounded-[40px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
          <div className="w-16 h-16 rounded-3xl bg-indigo-600 text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-600/20">
            <FiUsers className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Remote First</h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Work from anywhere in the world. We believe in talent, not locations.</p>
        </div>
        <div className="p-8 rounded-[40px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
          <div className="w-16 h-16 rounded-3xl bg-purple-600 text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-600/20">
            <FiBriefcase className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Great Benefits</h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Health insurance, 401k, and a generous budget for your home office setup.</p>
        </div>
        <div className="p-8 rounded-[40px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
          <div className="w-16 h-16 rounded-3xl bg-emerald-600 text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-600/20">
            <FiMapPin className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Equity Options</h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">Every employee is a partial owner. We grow together and share the success.</p>
        </div>
      </div>

      {/* Roles */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-10 text-center">Open Positions</h2>
        <div className="space-y-4">
          {jobs.map((job, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:shadow-xl hover:shadow-indigo-500/5"
            >
              <div>
                <h4 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 transition-colors">{job.title}</h4>
                <div className="flex flex-wrap gap-4 mt-2">
                  <span className="text-xs text-zinc-500 bg-zinc-50 dark:bg-zinc-800 px-3 py-1 rounded-full uppercase font-bold tracking-widest">{job.dept}</span>
                  <span className="text-xs text-zinc-500 border border-zinc-200 dark:border-zinc-800 px-3 py-1 rounded-full uppercase font-bold tracking-widest">{job.loc}</span>
                </div>
              </div>
              <button className="flex items-center gap-2 text-indigo-600 font-bold text-sm bg-indigo-50 dark:bg-indigo-900/10 px-6 py-3 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                Apply Now <FiArrowRight />
              </button>
            </div>
          ))}
        </div>
        <p className="text-center text-zinc-500 mt-12 text-sm italic">
          Don't see a role that fits? <span className="text-indigo-600 font-bold cursor-pointer hover:underline">Get in touch anyway.</span>
        </p>
      </div>
    </div>
  );
};

export default CareersPage;
