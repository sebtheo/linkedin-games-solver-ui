import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { GameInfo } from '../types';

interface GameCardProps {
  gameInfo: GameInfo;
  children: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ 
  gameInfo, 
  children, 
  isExpanded = true, 
  onToggle 
}) => {
  const { name, description, color, icon } = gameInfo;
  
  // Import icon dynamically
  const IconComponent = React.lazy(() => 
    import('lucide-react').then(mod => ({ 
      default: mod[icon as keyof typeof mod] || mod.HelpCircle 
    }))
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md transition-all duration-300 overflow-hidden mb-6">
      <div 
        className={`px-4 py-3 flex items-center justify-between cursor-pointer ${color} text-white`}
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <React.Suspense fallback={<div className="w-5 h-5" />}>
            <IconComponent size={20} />
          </React.Suspense>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-xs text-white/80">{description}</p>
          </div>
        </div>
        
        {onToggle && (
          <button 
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        )}
      </div>
      
      {isExpanded && (
        <div className="p-4 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
};

export default GameCard;