"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="p-2 w-9 h-9" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-xl bg-slate-100/50 dark:bg-red-950/20 hover:bg-slate-200 dark:hover:bg-red-900/30 transition-all duration-300 group ring-1 ring-slate-200/50 dark:ring-red-500/10"
      aria-label="Toggle Theme"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <div className={`absolute inset-0 transform transition-transform duration-500 ease-in-out ${isDark ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
          <FiSun className="w-5 h-5 text-yellow-500 group-hover:rotate-45 transition-transform duration-500" />
        </div>
        <div className={`absolute inset-0 transform transition-transform duration-500 ease-in-out ${!isDark ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'}`}>
          <FiMoon className="w-5 h-5 text-slate-700 group-hover:-rotate-12 transition-transform duration-500" />
        </div>
      </div>
    </button>
  );
}
