import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <AlertTriangle size={40} className="text-amber-500 mb-4" />
      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
        Something went wrong
      </h3>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        {message || "We couldn't load the solutions. Please try again."}
      </p>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        >
          <RefreshCw size={16} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default ErrorState;