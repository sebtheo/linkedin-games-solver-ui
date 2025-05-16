import React from 'react';
import GameCard from '../GameCard';
import { getGameInfo } from '../../utils/gameUtils';

interface PinpointSolutionProps {
  solution: string;
}

const PinpointSolution: React.FC<PinpointSolutionProps> = ({ solution }) => {
  return (
    <GameCard gameInfo={getGameInfo('pinpoint')}>
      <div className="text-center p-4">
        <div className="mb-6">
          <h4 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">Today's Theme</h4>
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md inline-block">
            {solution}
          </p>
        </div>
        
        <div className="text-sm text-slate-600 dark:text-slate-400 mt-4">
          <p>Pinpoint challenges you to identify the common theme across four images.</p>
        </div>
      </div>
    </GameCard>
  );
};

export default PinpointSolution;