import React from "react";
import { Moon, Sun, Github, Puzzle } from "lucide-react";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="sticky top-0 z-10 bg-white/90 dark:bg-slate-900/90 transition-colors duration-300 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="hidden sm:flex items-center space-x-2">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            LinkedIn Games Solver
          </h1>
        </div>

        <div className="flex sm:hidden items-center space-x-2">
          <Puzzle size={20} />
        </div>

        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/sebtheo"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            aria-label="GitHub Repository"
          >
            <Github size={20} />
          </a>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
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
};

export default Header;
