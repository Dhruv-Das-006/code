"use client";

import { FiUsers, FiGithub, FiTwitter, FiMessageCircle } from 'react-icons/fi';
import { FaDiscord, FaSlack } from 'react-icons/fa';

const CommunityPage = () => {
  const channels = [
    { title: "Discord", desc: "Real-time discussions", icon: <FaDiscord />, members: "12k members", color: "bg-red-600", url: "https://discord.com" },
    { title: "GitHub", desc: "Open source contributions", icon: <FiGithub />, members: "5k stars", color: "bg-slate-900", url: "https://github.com/Dhruv-Das-006/code.git" },
  ];

  return (
    <div className="container mx-auto px-4 py-20 max-w-6xl">
      <div className="text-center mb-24 animate-in fade-in duration-1000">
        <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter uppercase">
          Build <span className="text-red-600">Together.</span>
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto italic font-semibold">
          Join a global community of developers who are passionate about building for the web.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {channels.map((ch) => (
          <div
            key={ch.title}
            className="group relative p-10 rounded-[50px] bg-white dark:bg-red-950/20 border border-slate-200 dark:border-red-500/20 hover:border-red-500 transition-all cursor-pointer overflow-hidden shadow-xl shadow-red-600/5"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${ch.color} opacity-5 rounded-bl-full translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700`} />
            <div className="flex items-center gap-8 mb-8">
              <div className={`w-20 h-20 rounded-[30px] ${ch.color} text-white flex items-center justify-center text-4xl shadow-2xl group-hover:rotate-6 transition-transform duration-300`}>
                {ch.icon}
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{ch.title}</h3>
                <span className="text-xs font-black uppercase text-red-600 tracking-widest">{ch.members}</span>
              </div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-semibold leading-relaxed mb-8">{ch.desc}</p>
            <a href={ch.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-black text-sm uppercase tracking-widest text-slate-900 dark:text-white group-hover:text-red-600 transition-colors w-fit">
              Join Channel <FiMessageCircle />
            </a>
          </div>
        ))}
      </div>

      <div className="p-16 rounded-[60px] bg-linear-to-br from-red-600 to-rose-800 text-white text-center shadow-2xl shadow-red-600/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
        <h2 className="text-4xl font-black mb-6 relative z-10 tracking-tighter">Upcoming Community Meetups</h2>
        <p className="text-red-100 mb-10 max-w-2xl mx-auto text-lg leading-relaxed relative z-10 font-semibold">
          We host monthly virtual and in-person meetups across the globe. Connect with fellow developers and learn from the experts.
        </p>
        <button className="px-12 py-5 bg-white text-red-600 font-black text-sm uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl relative z-10">
          View Event Calendar
        </button>
      </div>
    </div>
  );
};

export default CommunityPage;
