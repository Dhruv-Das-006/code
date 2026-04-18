"use client";

import React from 'react';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';

const BlogPage = () => {
  const posts = [
    {
      title: "Introducing D-Code 2.0: The Fast just got Faster",
      excerpt: "Today we're launching our biggest update yet with a brand new rendering engine and enhanced AI snippets.",
      date: "Oct 12, 2024",
      read: "5 min read",
      author: "Dhruv Das",
      category: "Announcements"
    },
    {
      title: "10 CSS Tricks to Master Responsive Layouts",
      excerpt: "Learn how to use modern CSS features like Container Queries and Subgrid to build layouts that adapt to any screen.",
      date: "Oct 08, 2024",
      read: "8 min read",
      author: "Sarah Smith",
      category: "Tutorials"
    },
    {
      title: "Why We Switched to Rust for Our Compiler",
      excerpt: "A deep dive into how migrating our core build system to Rust improved Compilation speeds by over 400%.",
      date: "Sep 28, 2024",
      read: "12 min read",
      author: "Alex Rivers",
      category: "Engineering"
    },
    {
      title: "The Future of Browser-Based Development",
      excerpt: "Exploring the trends and technologies that are making the browser the primary environment for pro developers.",
      date: "Sep 15, 2024",
      read: "6 min read",
      author: "Emily Chen",
      category: "Insights"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-6 tracking-tighter uppercase">
          The <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 via-indigo-500 to-purple-600">Blog.</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto italic">
          Insights, tutorials, and announcements from the D-Code team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {posts.map((post, idx) => (
          <article
            key={idx}
            className="group cursor-pointer flex flex-col items-start"
          >
            {/* Mock Image Placeholder */}
            <div className="w-full aspect-video rounded-[40px] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-6 overflow-hidden relative shadow-lg group-hover:shadow-indigo-500/10 transition-all duration-500">
              <div className="absolute inset-0 bg-linear-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-4 left-4 px-4 py-1 bg-white dark:bg-zinc-950 rounded-full text-[10px] font-black uppercase text-zinc-900 dark:text-white shadow-sm">
                {post.category}
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-500 mb-4 font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><FiCalendar /> {post.date}</span>
              <span className="flex items-center gap-1.5"><FiClock /> {post.read}</span>
            </div>

            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
              {post.title}
            </h2>
            
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
                  {post.author.charAt(0)}
                </div>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-300">{post.author}</span>
              </div>
              <span className="text-indigo-600 dark:text-indigo-400 group-hover:translate-x-2 transition-transform duration-300">
                <FiArrowRight className="w-6 h-6" />
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-32 text-center pt-20 border-t border-zinc-200 dark:border-zinc-800">
        <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4">Stay updated.</h3>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8">Get the latest posts directly in your inbox.</p>
        <div className="flex max-w-md mx-auto gap-2">
          <input
            type="email"
            placeholder="name@example.com"
            className="grow px-6 py-4 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all"
          />
          <button className="px-8 py-4 bg-zinc-900 dark:bg-indigo-600 text-white font-bold rounded-full hover:bg-zinc-800 dark:hover:bg-indigo-700 transition-colors shadow-lg">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
