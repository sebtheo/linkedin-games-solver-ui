import React, { useState } from 'react';
import { Solution } from '../types';
import PinpointSolution from './games/PinpointSolution';
import CrossclimbSolution from './games/CrossclimbSolution';
import QueensSolution from './games/QueensSolution';
import ZipSolution from './games/ZipSolution';
import TangoSolution from './games/TangoSolution';

interface SolutionContainerProps {
  solution: Solution;
  date: string;
}

const SolutionContainer: React.FC<SolutionContainerProps> = ({ 
  solution, 
  date 
}) => {
  const [expandedGames, setExpandedGames] = useState<Record<string, boolean>>({
    pinpoint: true,
    crossclimb: true,
    queens: true,
    zip: true,
    tango: true
  });

  const toggleGame = (game: string) => {
    setExpandedGames(prev => ({
      ...prev,
      [game]: !prev[game]
    }));
  };

  return (
    <div className="container mx-auto px-4 py-2 max-w-3xl animate-fadeIn">
      <div className="space-y-6">
        <PinpointSolution 
          solution={solution.pinpoint} 
        />
        
        <CrossclimbSolution 
          solution={solution.crossclimb} 
        />
        
        <QueensSolution 
          solution={solution.queens} 
          board={solution.queens_board} 
          gridSize={solution.queens_grid} 
        />
        
        <ZipSolution 
          solution={solution.zip} 
          sequence={solution.zip_sequence} 
          gridSize={solution.zip_grid} 
        />
        
        <TangoSolution 
          solution={solution.tango} 
        />
      </div>
    </div>
  );
};

export default SolutionContainer;