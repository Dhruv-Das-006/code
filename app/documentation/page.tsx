"use client";

import React from 'react';
import { FiBook, FiSearch, FiChevronRight, FiTerminal, FiLayout, FiLayers } from 'react-icons/fi';

const DocumentationPage = () => {
  const sections = [
    { title: "Getting Started", icon: <FiTerminal />, items: ["Installation", "Your First App", "Basic Syntax"] },
    { title: "Editor Features", icon: <FiLayout />, items: ["Shortcuts", "IntelliSense", "Live Preview"] },
    { title: "Advanced", icon: <FiLayers />, items: ["Custom Plugins", "API Integration", "Deployment"] },
  ];

  return (
    <div className="container mx-auto px-4 py-20 max-w-6xl">
      <div className="mb-16">
        <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6">Documentation.</h1>
        <p className="text-xl text-slate-500 dark:text-slate-400">Everything you need to build with D-Code.</p>
      </div>

      <div className="relative mb-16">
        <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
        <input 
          type="text" 
          placeholder="Search documentation..." 
          className="w-full pl-16 pr-8 py-6 rounded-[30px] bg-slate-50 dark:bg-red-950/10 border border-slate-200 dark:border-red-500/20 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all text-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sections.map((section) => (
          <div key={section.title} className="p-8 rounded-[40px] bg-white dark:bg-red-950/20 border border-slate-200 dark:border-red-500/20 hover:border-red-500/50 transition-all duration-300 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-900/10 text-red-600 flex items-center justify-center mb-6">
              {section.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{section.title}</h3>
            <ul className="space-y-4">
              {section.items.map((item) => (
                <li key={item}>
                  <button className="flex items-center justify-between w-full text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-all group">
                    <span className="font-semibold group-hover:translate-x-2 transition-transform duration-300">{item}</span>
                    <FiChevronRight className="text-red-500 opacity-0 group-hover:opacity-100 transition-all font-bold" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentationPage;
