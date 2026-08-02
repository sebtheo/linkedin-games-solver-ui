"use client";

import Link from "next/link";
import { Moon, Sun, Github, Puzzle, Archive } from "lucide-react";
import { useDarkMode } from "./DarkModeProvider";
import Image from "next/image";

export default function Header() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="sticky top-0 z-10 bg-white/90 dark:bg-slate-900/90 transition-colors duration-300 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center justify-center space-x-2">
          <Image
            width={32}
            height={32}
            src="/logo512.png"
            alt="Logo"
            className="w-8 h-8 text-slate-800 dark:text-slate-100 mb-2"
          />

          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            <Link href="/" className="sm:hidden">
              Solver
            </Link>
            <Link href="/" className="hidden sm:block">
              LinkedIn Games Solver
            </Link>
          </h1>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link
            href="https://github.com/sebtheo"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl p-2 border border-slate-200 dark:border-slate-700 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            aria-label="GitHub Repository"
          >
            <Github size={20} />
          </Link>
          <Link
            href="/archive"
            className="rounded-xl p-2 border border-slate-200 dark:border-slate-700 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            aria-label="Archive"
          >
            <Archive size={20} />
          </Link>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={
              isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
