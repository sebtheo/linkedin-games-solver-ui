import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import DateSelector from '../components/DateSelector';
import SolutionContainer from '../components/SolutionContainer';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { useSolutions } from '../hooks/useSolutions';
import { useDarkMode } from '../hooks/useDarkMode';
import { getFormattedToday } from '../utils/dateUtils';

const Home: React.FC = () => {
  const { date } = useParams<{ date?: string }>();
  const navigate = useNavigate();
  
  const {
    currentSolution,
    availableDates,
    currentDate,
    isLoading,
    error,
    changeDate
  } = useSolutions(date);
  
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // Update the page title with the current solution date
  useEffect(() => {
    if (currentSolution) {
      document.title = `LinkedIn Games Solutions - ${currentSolution.date}`;
    } else {
      document.title = 'LinkedIn Games Solutions';
    }
  }, [currentSolution]);
  
  // Handle date changes and update the URL
  const handleDateChange = (newDate: string) => {
    changeDate(newDate);
    
    // Update URL to reflect the current date
    if (newDate === getFormattedToday()) {
      navigate('/');
    } else {
      navigate(`/${newDate}`);
    }
  };
  
  const handleRetry = () => {
    changeDate(currentDate);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="pb-16">
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
          />
        ) : null}
      </main>
      
      <footer className="py-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center text-sm text-slate-600 dark:text-slate-400">
          <p className="mb-2">
            LinkedIn Games Solutions - Daily updates for Pinpoint, Queens, Zip, Tango, and Crossclimb
          </p>
          <p>
            Built with ❤️ for puzzle enthusiasts. This is not affiliated with LinkedIn.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;