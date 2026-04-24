"use client";

import React from 'react';
import { FiUsers, FiMessageSquare, FiSettings, FiUserPlus, FiBell } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useTheme } from 'next-themes';

const MemberSidebar = () => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const members = [''];

  const handleFriendRequest = () => {
    toast.success('Friend Request sent!', {
      style: {
        borderRadius: '12px',
        background: currentTheme === 'light' ? '#fff' : '#0f172a',
        color: currentTheme === 'light' ? '#1e293b' : '#fff',
        border: `1px solid ${currentTheme === 'light' ? '#e2e8f0' : '#22c55e'}`,
      },
      iconTheme: {
        primary: '#22c55e',
        secondary: '#fff',
      },
    });
  };

  const handleAddMember = () => {
    toast('Collaboration coming soon!', {
      icon: '🚀',
      style: {
        borderRadius: '12px',
        background: currentTheme === 'light' ? '#fff' : '#0f172a',
        color: currentTheme === 'light' ? '#1e293b' : '#fff',
        border: `1px solid ${currentTheme === 'light' ? '#e2e8f0' : '#22c55e'}`,
      },
    });
  };

  return (
    <div className="flex flex-col h-full gap-6 pb-8 no-scrollbar overflow-y-auto">
      {/* Members Section */}
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-4">
          <FiUsers className="text-emerald-500 w-5 h-5" />
          <h3 className="text-emerald-600 font-bold uppercase tracking-wider text-sm">Members Online</h3>
        </div>
        
        <div className={`border rounded-2xl p-4 flex flex-col gap-3 transition-colors duration-300 ${
          currentTheme === 'light' ? 'bg-emerald-50 border-emerald-100' : 'bg-emerald-500/10 border-emerald-500/30'
        }`}>
          <div className="flex flex-col gap-2">
            {members.map(member => (
              <div key={member} className="flex items-center gap-2 group cursor-default">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                <span className={`transition-colors font-medium ${
                  currentTheme === 'light' ? 'text-slate-600 group-hover:text-slate-900' : 'text-emerald-100/80 group-hover:text-emerald-100'
                }`}>{member}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex flex-col gap-2">
            <button className={`flex items-center gap-2 transition-colors font-bold uppercase text-xs tracking-widest px-2 py-1 ${
              currentTheme === 'light' ? 'text-emerald-600 hover:text-emerald-700' : 'text-emerald-400 hover:text-emerald-300'
            }`}>
              <FiMessageSquare className="w-4 h-4" />
              Chat
            </button>
          </div>
        </div>
      </div>

      {/* Add Members Button */}
      <button 
        onClick={handleAddMember}
        className={`w-full py-4 flex items-center justify-center gap-3 transition-colors font-black uppercase tracking-widest text-sm mt-auto border-t ${
          currentTheme === 'light' ? 'text-emerald-600 hover:text-emerald-700 border-slate-100' : 'text-emerald-500 hover:text-emerald-400 border-slate-800/50'
        }`}
      >
        <FiUserPlus className="w-5 h-5" />
        Add Members
      </button>
    </div>
  );
};

export default MemberSidebar; 
