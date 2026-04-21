"use client";

import React from 'react';
import Link from 'next/link';
import { FiGithub, FiCode, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const sections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Editor", href: "/editor" },
        { name: "Live Preview", href: "/live-preview" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" },
        { name: "Privacy", href: "/privacy" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/documentation" },
        { name: "Support", href: "/support" },
        { name: "API Reference", href: "/api-docs" },
        { name: "Community", href: "/community" },
      ]
    }
  ];

  return (
    <footer className="w-full bg-slate-50/50 dark:bg-slate-950/50 border-t border-red-100 dark:border-red-900/30 transition-colors duration-500">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Logo & Github */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-red-600 text-white">
                <FiCode className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
                D-Code
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 max-w-xs mb-8 text-sm leading-relaxed font-medium">
              The next-generation online editor for modern developers. Build, test, and ship code faster than ever before.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/Dhruv-Das-006/code.git"
                className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:border-red-600 transition-all duration-300 shadow-sm"
                aria-label="GitHub"
              >
                <FiGithub className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Links Sections */}
          {sections.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="font-bold text-zinc-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 text-sm font-medium transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500 dark:text-slate-500 text-center md:text-left font-medium">
            © {new Date().getFullYear()} D-Code. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link
              href="/credits"
              className="text-xs text-slate-500 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium underline underline-offset-4 decoration-slate-200 dark:decoration-slate-800"
            >
              Credits
            </Link>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500 font-medium">
              <span>Made with</span>
              <FiHeart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>for developers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
