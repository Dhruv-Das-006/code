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
    <footer className="w-full bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Logo & Github */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
                <FiCode className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                D-Code
              </span>
            </Link>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-xs mb-6 text-sm leading-relaxed">
              The next-generation online editor for modern developers. Build, test, and ship code faster than ever before.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com"
                className="p-2 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-600 transition-all duration-300"
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
                      className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors duration-200"
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
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-500 dark:text-zinc-500 text-center md:text-left">
            © {new Date().getFullYear()} D-Code. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/credits"
              className="text-xs text-zinc-500 dark:text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Credits
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-500">
              <span>Made with</span>
              <FiHeart className="w-3 h-3 text-red-500 fill-red-500" />
              <span>for developers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
