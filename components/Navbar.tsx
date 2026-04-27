"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { logout as logoutAction } from '@/store/authSlice';
import { FiCode, FiMenu, FiX, FiUser, FiLogOut, FiTrash2 } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Editor', path: '/editor', protected: true },
    ...(mounted && isAuthenticated ? [
      { name: 'Logout', path: '#', action: 'logout' }
    ] : [
      { name: 'Signup', path: '/signup' },
      { name: 'Login', path: '/login' },
    ]),
  ];

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      dispatch(logoutAction());
      toast.success("Logged out successfully");
      router.push('/');
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    toast((t) => (
      <div className="flex flex-col gap-3 p-1">
        <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">
          Delete account permanently?
        </p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              setDeleteLoading(true);
              try {
                const res = await fetch('/api/auth/delete-account', { method: 'POST' });
                if (res.ok) {
                  dispatch(logoutAction());
                  toast.success("Account delete", { icon: '🗑️' });
                  router.push('/');
                } else {
                  toast.error("Failed to delete");
                }
              } catch (error) {
                toast.error("An error occurred");
              } finally {
                setDeleteLoading(false);
              }
            }}
            disabled={deleteLoading}
            className="px-4 py-2 bg-red-600 text-white text-[10px] font-black rounded-lg hover:bg-red-700 transition-colors uppercase tracking-widest"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-black rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors uppercase tracking-widest"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 1000,
      position: 'top-center',
      style: {
        borderRadius: '1.5rem',
        background: 'var(--bg-popover)',
        border: '1px solid var(--border)',
        padding: '1rem',
      },
    });
  };

  const handleLinkClick = (e: React.MouseEvent, link: any) => {
    if (link.protected && !isAuthenticated) {
      e.preventDefault();
      toast.error("first login", { icon: '🔒' }); // Specific wording requested
      router.push('/login');
      return;
    }

    if (link.action === 'logout') {
      e.preventDefault();
      handleLogout();
    }
  };

  useEffect(() => {
    setIsOpen(false);
    setIsProfileOpen(false);
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
                onClick={(e) => handleLinkClick(e, link)}
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
          
          {mounted && isAuthenticated && user && (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
              >
                <FiUser className="w-5 h-5" />
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200/60 dark:border-slate-800/60 p-6 overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-900 dark:text-white truncate">{user.name}</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest truncate">{user.email}</span>
                    </div>
                    
                    <div className="h-px bg-slate-100 dark:bg-slate-800"></div>
                    
                    <button
                      onClick={handleDeleteAccount}
                      disabled={deleteLoading}
                      className="flex items-center gap-3 text-xs font-black text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 p-3 rounded-2xl transition-all disabled:opacity-50"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      DELETE ACCOUNT
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

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
                handleLinkClick(e as any, link);
                if (link.path !== '#') router.push(link.path);
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

