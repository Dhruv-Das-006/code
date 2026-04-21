"use client";

import React from 'react';
import { FiMonitor, FiSmartphone, FiTablet, FiMaximize2, FiRotateCw } from 'react-icons/fi';

const LivePreviewPage = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6">
          Live <span className="text-red-600">Preview.</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          See your code come to life instantly. Test across multiple viewports with zero configuration.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-red-950/20 border border-b-0 border-slate-200 dark:border-red-500/20 rounded-t-3xl">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg"><FiMonitor /></button>
            <button className="p-2 text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"><FiTablet /></button>
            <button className="p-2 text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"><FiSmartphone /></button>
            <div className="w-px h-6 bg-slate-300 dark:bg-red-900/50" />
            <button className="p-2 text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"><FiRotateCw /></button>
            <button className="p-2 text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"><FiMaximize2 /></button>
          </div>
        </div>

        {/* Mock Preview Content */}
        <div className="relative aspect-video bg-white dark:bg-slate-900 border border-slate-200 dark:border-red-500/20 rounded-b-3xl shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="w-full h-full border-4 border-dashed border-slate-200 dark:border-red-900/50 rounded-2xl flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-red-600/10 text-red-600 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-500">
                <FiMonitor className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Editor Environment Preview</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                Your live results will appear here as you type. Launching the full editor will provide the interactive experience.
              </p>
              <button className="mt-8 px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg">
                Launch Full Editor
              </button>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="p-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 uppercase text-xs tracking-widest">Pixel Perfect</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">High-fidelity rendering ensures that what you see is exactly what your users will experience.</p>
          </div>
          <div className="p-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 uppercase text-xs tracking-widest">Multi-Device</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Instantly switch between pre-defined device profiles or define your own custom resolution.</p>
          </div>
          <div className="p-6">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 uppercase text-xs tracking-widest">Live Reload</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Hot Module Replacement (HMR) allows for state-persistent updates without refreshing the page.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreviewPage;
