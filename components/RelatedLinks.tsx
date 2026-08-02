import { Github, Package } from "lucide-react";

export default function RelatedLinks() {
  return (
    <section className="bg-white dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-300">
          Related links
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <a
            href="https://sebtheo.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors p-4"
          >
            <div className="text-sm font-medium text-slate-800 dark:text-slate-100">
              Sebastian Theo
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Portfolio &amp; projects at sebtheo.uk
            </div>
          </a>
          <a
            href="https://pypi.org/project/linkedin_games_scraper/"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors p-4"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-100">
              <Package
                size={16}
                className="text-slate-600 dark:text-slate-400"
              />
              Package
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              PyPI: linkedin_games_scraper
            </div>
          </a>
          <a
            href="https://github.com/sebtheo/linkedin-games-scraper"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors p-4"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-100">
              <Github
                size={16}
                className="text-slate-600 dark:text-slate-400"
              />
              Source Code
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              GitHub: linkedin-games-scraper
            </div>
          </a>
          <a
            href="https://github.com/sebtheo/linkedin-games-solver-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors p-4"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-100">
              <Github
                size={16}
                className="text-slate-600 dark:text-slate-400"
              />
              User Interface
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              GitHub: linkedin-games-solver-ui
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
