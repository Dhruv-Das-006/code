"use client";

import React from 'react';
import { FiArrowLeft, FiMonitor, FiTablet, FiSmartphone, FiRotateCcw } from 'react-icons/fi';
import Link from 'next/link';

import { useTheme } from 'next-themes';

interface ResultToolbarProps {
  onViewportChange: (viewport: 'desktop' | 'tablet' | 'mobile') => void;
  currentViewport: string;
  borderRadius: number;
  setBorderRadius: (radius: number) => void;
  borderColor: string;
  setBorderColor: (color: string) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}

const ResultToolbar: React.FC<ResultToolbarProps> = ({ 
  onViewportChange, 
  currentViewport,
  borderRadius,
  setBorderRadius,
  borderColor,
  setBorderColor,
  backgroundColor,
  setBackgroundColor
}) => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div className={`flex items-center justify-between px-6 py-3 border-b backdrop-blur-xl sticky top-0 z-50 transition-colors duration-300 ${
      currentTheme === 'light' ? 'bg-white/80 border-slate-200' : 'bg-[#0a0d14]/80 border-slate-800/50'
    }`}>
      <div className="flex items-center gap-4">
        <Link 
          href="/editor"
          className={`p-2.5 rounded-xl border transition-all active:scale-95 group ${
            currentTheme === 'light' 
              ? 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900' 
              : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white hover:border-emerald-500/50'
          }`}
          title="Back to Editor"
        >
          <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </Link>
        
        <div className={`h-6 w-px ${currentTheme === 'light' ? 'bg-slate-200' : 'bg-slate-800'}`} />

        {/* BORDER RADIUS CONTROL */}
        <div className={`flex items-center gap-3 px-4 py-1.5 rounded-xl border transition-colors duration-300 ${
          currentTheme === 'light' ? 'bg-slate-50 border-slate-100' : 'bg-slate-900/30 border-slate-800/50'
        }`}>
          <span className="text-[10px] uppercase tracking-widest font-black text-slate-500">Radius</span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={borderRadius}
            onChange={(e) => setBorderRadius(parseInt(e.target.value))}
            className="w-24 accent-emerald-500 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-[10px] font-mono text-emerald-500 w-6">{borderRadius}px</span>
        </div>

        {/* BORDER COLOR CONTROL */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-colors duration-300 ${
          currentTheme === 'light' ? 'bg-slate-50 border-slate-100' : 'bg-slate-900/30 border-slate-800/50'
        }`}>
          <span className="text-[10px] uppercase tracking-widest font-black text-slate-500 mr-1">Border</span>
          {[
            { name: 'blue', class: 'bg-blue-500' },
            { name: 'black', class: 'bg-black border border-slate-700' },
            { name: 'yellow', class: 'bg-yellow-400' },
            { name: 'transparent', class: 'bg-slate-300 dark:bg-slate-800 border border-slate-200 dark:border-slate-700' }
          ].map(color => (
            <button
              key={color.name}
              onClick={() => setBorderColor(color.name)}
              className={`w-4 h-4 rounded-full ${color.class} transition-all ${
                borderColor === color.name ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-white dark:ring-offset-[#0a0d14] scale-110' : 'opacity-60 hover:opacity-100'
              }`}
              title={`${color.name} Border`}
            />
          ))}
        </div>

        {/* BACKGROUND COLOR CONTROL */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-colors duration-300 ${
          currentTheme === 'light' ? 'bg-slate-50 border-slate-100' : 'bg-slate-900/30 border-slate-800/50'
        }`}>
          <span className="text-[10px] uppercase tracking-widest font-black text-slate-500 mr-1">BG</span>
          {[
            { name: 'dark', class: 'bg-[#05070a]' },
            { name: 'light', class: 'bg-slate-50 border border-slate-200' },
            { name: 'gray', class: 'bg-slate-800' },
            { name: 'indigo', class: 'bg-indigo-950' }
          ].map(color => (
            <button
              key={color.name}
              onClick={() => setBackgroundColor(color.name)}
              className={`w-4 h-4 rounded-full ${color.class} transition-all ${
                backgroundColor === color.name ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-white dark:ring-offset-[#0a0d14] scale-110' : 'opacity-60 hover:opacity-100'
              }`}
              title={`${color.name} Background`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => onViewportChange('desktop')}
          className={`p-2.5 rounded-xl transition-all ${
            currentViewport === 'desktop' 
              ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
              : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-300'
          }`}
          title="Desktop View"
        >
          <FiMonitor className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onViewportChange('tablet')}
          className={`p-2.5 rounded-xl transition-all ${
            currentViewport === 'tablet' 
              ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
              : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-300'
          }`}
          title="Tablet View"
        >
          <FiTablet className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onViewportChange('mobile')}
          className={`p-2.5 rounded-xl transition-all ${
            currentViewport === 'mobile' 
              ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
              : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-300'
          }`}
          title="Mobile View"
        >
          <FiSmartphone className="w-5 h-5" />
        </button>
        <div className={`w-px h-6 mx-2 ${currentTheme === 'light' ? 'bg-slate-200' : 'bg-slate-800'}`} />
        <button 
          onClick={() => window.location.reload()}
          className={`p-2.5 transition-colors ${
            currentTheme === 'light' ? 'text-slate-400 hover:text-emerald-600' : 'text-slate-500 hover:text-emerald-400'
          }`}
          title="Refresh Preview"
        >
          <FiRotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ResultToolbar;
