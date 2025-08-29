import React, { useEffect } from "react";
import { Github, Package } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import DateSelector from "../components/DateSelector";
import SolutionContainer from "../components/SolutionContainer";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import { useSolutions } from "../hooks/useSolutions";
import { useDarkMode } from "../hooks/useDarkMode";
import { getFormattedToday } from "../utils/dateUtils";

const Home: React.FC = () => {
  const { date } = useParams<{ date?: string }>();
  const navigate = useNavigate();

  const {
    currentSolution,
    availableDates,
    currentDate,
    isLoading,
    error,
    changeDate,
  } = useSolutions(date);

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // Update the page title with the current solution date
  useEffect(() => {
    if (currentSolution) {
      document.title = `LinkedIn Games Solver - ${currentSolution.date}`;
    } else {
      document.title = "LinkedIn Games Solver";
    }
  }, [currentSolution]);

  // Handle date changes and update the URL
  const handleDateChange = (newDate: string) => {
    changeDate(newDate);

    // Update URL to reflect the current date
    if (newDate === getFormattedToday()) {
      navigate("/");
    } else {
      navigate(`/${newDate}`);
    }
  };

  const handleRetry = () => {
    changeDate(currentDate);
  };

  const handleToggle = (game: string) => {
    console.log(game);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="min-h-screen">
        {availableDates.length > 0 && (
          <DateSelector
            currentDate={currentDate}
            availableDates={availableDates}
            onDateChange={handleDateChange}
          />
        )}

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error.message} onRetry={handleRetry} />
        ) : currentSolution ? (
          <SolutionContainer
            solution={currentSolution.solutions.data}
            date={currentSolution.date}
            onToggle={handleToggle}
          />
        ) : null}
      </main>

      <section className="bg-white dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-300">
            Related links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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

      <footer className="py-6 bg-white dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center text-sm text-slate-600 dark:text-slate-400">
          <p className="mb-2">LinkedIn Games Solver</p>
          <p>
            Built with ❤️ by{" "}
            <a
              href="https://github.com/sebtheo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              SebTheo
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
