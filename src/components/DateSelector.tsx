import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { formatDate, isToday } from '../utils/dateUtils';

interface DateSelectorProps {
  currentDate: string;
  availableDates: string[];
  onDateChange: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ 
  currentDate, 
  availableDates, 
  onDateChange 
}) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const currentIndex = availableDates.findIndex(date => date === currentDate);
  const hasPrevious = currentIndex < availableDates.length - 1;
  const hasNext = currentIndex > 0;
  
  const goToPrevious = () => {
    if (hasPrevious) {
      onDateChange(availableDates[currentIndex + 1]);
    }
  };
  
  const goToNext = () => {
    if (hasNext) {
      onDateChange(availableDates[currentIndex - 1]);
    }
  };
  
  const goToToday = () => {
    if (availableDates.length > 0) {
      onDateChange(availableDates[0]);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onDateChange(e.target.value);
    setIsSelectOpen(false);
  };

  return (
    <div className="flex flex-col items-center space-y-2 py-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={goToPrevious}
          disabled={!hasPrevious}
          className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 
                   hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 
                   disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Previous Day"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-medium text-slate-800 dark:text-slate-200">
            {formatDate(currentDate)}
          </h2>
          {!isToday(currentDate) && (
            <button
              onClick={goToToday}
              className="text-sm text-blue-600 dark:text-blue-400 flex items-center space-x-1 hover:underline"
            >
              <Calendar size={14} />
              <span>Back to Today</span>
            </button>
          )}
        </div>
        
        <button
          onClick={goToNext}
          disabled={!hasNext}
          className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 
                   hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 
                   disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Next Day"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      {availableDates.length > 7 && (
        <div className="relative w-full max-w-md">
          <select
            value={currentDate}
            onChange={handleSelectChange}
            onFocus={() => setIsSelectOpen(true)}
            onBlur={() => setIsSelectOpen(false)}
            className="w-full p-2 pr-8 border border-slate-300 dark:border-slate-700 rounded-md 
                     bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            {availableDates.map(date => (
              <option key={date} value={date}>
                {formatDate(date)}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown size={16} className="text-slate-500" />
          </div>
        </div>
      )}
    </div>
  );
};

const ChevronDown = ({ size, className }: { size: number, className: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export default DateSelector;