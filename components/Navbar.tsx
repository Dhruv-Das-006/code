"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiCode, FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Editor', path: '/editor' },
    { name: 'Signup', path: '/signup' },
    { name: 'Login', path: '/login' },
  ];

  const handleEditorClick = (e: React.MouseEvent) => {
    // Requirements: Toast redundancy resolved - keeping only the Editor page mount toast.
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-indigo-600 text-white group-hover:scale-110 transition-transform duration-300">
            <FiCode className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            D-Code
          </span>
        </Link>

        {/* Desktop Links - Centered */}
        <div className="hidden md:flex grow justify-center">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={link.name === 'Editor' ? handleEditorClick : undefined}
                className={`text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
                  pathname === link.path 
                    ? 'text-indigo-600 dark:text-indigo-400' 
                    : 'text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 py-6 px-4 flex flex-col gap-4 animate-in slide-in-from-top-5 duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={(e) => {
                if (link.name === 'Editor') handleEditorClick(e);
                setIsOpen(false);
              }}
              className={`text-base font-semibold p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all ${
                pathname === link.path 
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/10' 
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
