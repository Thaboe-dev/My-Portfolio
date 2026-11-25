"use client";

import { Moon, Sun } from "lucide-react";

const themeStorageKey = "portfolio-theme";

export function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const nextTheme = root.classList.contains("dark") ? "light" : "dark";

    root.classList.toggle("dark", nextTheme === "dark");
    root.style.colorScheme = nextTheme;

    try {
      localStorage.setItem(themeStorageKey, nextTheme);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="fixed right-5 top-5 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/85 text-slate-700 shadow-lg shadow-slate-900/10 backdrop-blur transition hover:border-teal-500 hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:border-slate-700 dark:bg-slate-800/85 dark:text-slate-200 dark:shadow-black/25 dark:hover:border-teal-300 dark:hover:text-teal-300 dark:focus-visible:outline-teal-300 sm:right-8 sm:top-8"
      aria-label="Toggle light and dark mode"
      title="Toggle light and dark mode"
    >
      <Moon className="h-5 w-5 dark:hidden" aria-hidden="true" />
      <Sun className="hidden h-5 w-5 dark:block" aria-hidden="true" />
    </button>
  );
}
