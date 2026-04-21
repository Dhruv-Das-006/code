"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiCode, FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Editor', path: '/editor' },
    { name: 'Signup', path: '/signup' },
    { name: 'Login', path: '/login' },
  ];

  const handleEditorClick = (e: React.MouseEvent) => {
    // Requirements: Toast redundancy resolved - keeping only the Editor page mount toast.
  };

  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/40 dark:border-slate-800/50 bg-white/60 dark:bg-slate-950/60 backdrop-blur-2xl transition-all duration-500 shadow-[0_1px_10px_rgba(0,0,0,0.01)]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
        
        {/* Logo - Left aligned */}
        <Link href="/" className="flex items-center gap-2.5 group relative z-10 font-bold">
          <div className="p-2 rounded-xl bg-red-600 text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl shadow-red-600/25">
            <FiCode className="w-5 h-5" />
          </div>
          <span className="text-xl tracking-tighter text-slate-900 dark:text-white font-black">
            D-Code
          </span>
        </Link>

        {/* Desktop Links - Absolutely Centered */}
        <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
          <div className="flex items-center gap-1 pointer-events-auto bg-slate-100/50 dark:bg-slate-800/40 p-1 rounded-full border border-slate-200/50 dark:border-slate-700/50 shadow-sm backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={link.name === 'Editor' ? handleEditorClick : undefined}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-500 ${
                  pathname === link.path 
                    ? 'bg-white dark:bg-red-950/40 text-red-600 dark:text-red-400 shadow-md ring-1 ring-slate-200/50 dark:ring-red-500/30' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Actions - Right aligned */}
        <div className="flex items-center gap-3 relative z-10">
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white/98 dark:bg-slate-950/98 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 py-8 px-6 flex flex-col gap-3 animate-in slide-in-from-top-4 duration-500 ease-out shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => {
                if (link.name === 'Editor') handleEditorClick(e);
                router.push(link.path);
              }}
              className={`text-sm font-black uppercase tracking-widest p-4 rounded-2xl transition-all text-left ${
                pathname === link.path 
                  ? 'text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-950/20 ring-1 ring-red-200/50 dark:ring-red-800/50' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
