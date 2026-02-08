"use client";

import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // FORCE light mode if no preference has been set yet
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      // Default to light regardless of system settings
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      if (!savedTheme) localStorage.setItem("theme", "light");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
        <span className="material-symbols-outlined text-xl">dark_mode</span>
        <span className="font-bold text-xs tracking-wide">Dark Mode</span>
      </div>
      <button
        onClick={toggleDarkMode}
        className={`w-10 h-5 rounded-full relative transition-all duration-300 ${
          isDark ? "bg-blue-600 shadow-inner shadow-blue-900" : "bg-slate-200"
        }`}
      >
        <div
          className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 shadow-sm ${
            isDark ? "left-6" : "left-1"
          }`}
        ></div>
      </button>
    </div>
  );
}
