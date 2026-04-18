"use client";

import { FiUsers, FiGithub, FiTwitter, FiMessageCircle } from 'react-icons/fi';
import { FaDiscord, FaSlack } from 'react-icons/fa';

const CommunityPage = () => {
  const channels = [
    { title: "Discord", desc: "Real-time discussions", icon: <FaDiscord />, members: "12k members", color: "bg-indigo-500" },
    { title: "GitHub", desc: "Open source contributions", icon: <FiGithub />, members: "5k stars", color: "bg-zinc-800" },
    { title: "Twitter", desc: "Latest news & updates", icon: <FiTwitter />, members: "25k followers", color: "bg-blue-400" },
    { title: "Slack", desc: "Professional networking", icon: <FaSlack />, members: "3k pros", color: "bg-purple-500" },
  ];

  return (
    <div className="container mx-auto px-4 py-20 max-w-6xl">
      <div className="text-center mb-24 animate-in fade-in duration-1000">
        <h1 className="text-5xl md:text-8xl font-black text-zinc-900 dark:text-white mb-8 tracking-tighter uppercase">
          Build <span className="text-indigo-600">Together.</span>
        </h1>
        <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto italic">
          Join a global community of developers who are passionate about building for the web.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {channels.map((ch) => (
          <div
            key={ch.title}
            className="group relative p-10 rounded-[50px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 transition-all cursor-pointer overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${ch.color} opacity-5 rounded-bl-full translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700`} />
            <div className="flex items-center gap-8 mb-8">
              <div className={`w-20 h-20 rounded-[30px] ${ch.color} text-white flex items-center justify-center text-4xl shadow-xl shadow-zinc-200 dark:shadow-none group-hover:rotate-6 transition-transform duration-300`}>
                {ch.icon}
              </div>
              <div>
                <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">{ch.title}</h3>
                <span className="text-xs font-black uppercase text-indigo-600 tracking-widest">{ch.members}</span>
              </div>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">{ch.desc}</p>
            <button className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 transition-colors">
              Join Channel <FiMessageCircle />
            </button>
          </div>
        ))}
      </div>

      <div className="p-16 rounded-[60px] bg-linear-to-br from-indigo-600 to-purple-800 text-white text-center shadow-2xl shadow-indigo-600/30">
        <h2 className="text-4xl font-black mb-6">Upcoming Community Meetups</h2>
        <p className="text-indigo-100 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
          We host monthly virtual and in-person meetups across the globe. Connect with fellow developers and learn from the experts.
        </p>
        <button className="px-12 py-5 bg-white text-indigo-600 font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl">
          View Event Calendar
        </button>
      </div>
    </div>
  );
};

export default CommunityPage;
