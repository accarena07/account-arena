"use client";

import { toggleDarkMode } from "./theme";

type ThemeToggleButtonProps = {
  className?: string;
  iconClassName?: string;
};

export default function ThemeToggleButton({
  className = "",
  iconClassName = "",
}: ThemeToggleButtonProps) {
  return (
    <button
      aria-label="Toggle theme"
      className={`rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 ${className}`.trim()}
      onClick={toggleDarkMode}
      type="button"
    >
      <span className={`material-symbols-outlined dark:hidden! ${iconClassName}`.trim()}>dark_mode</span>
      <span className={`material-symbols-outlined hidden! dark:inline-block! ${iconClassName}`.trim()}>light_mode</span>
    </button>
  );
}
