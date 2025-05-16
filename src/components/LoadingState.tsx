import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 size={40} className="text-blue-600 dark:text-blue-400 animate-spin mb-4" />
      <p className="text-slate-600 dark:text-slate-400">Loading solutions...</p>
    </div>
  );
};

export default LoadingState;