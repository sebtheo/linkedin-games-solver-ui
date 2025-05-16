import React from 'react';
import GameCard from '../GameCard';
import { getGameInfo } from '../../utils/gameUtils';

interface QueensSolutionProps {
  solution: [number, number][];
  board: number[][];
  gridSize: number;
}

const QueensSolution: React.FC<QueensSolutionProps> = ({ solution, board, gridSize }) => {
  const colorClasses = [
    'bg-[#bba3e2]',  // Light purple
    'bg-[#ffc992]',  // Light orange
    'bg-[#96beff]',  // Light blue
    'bg-[#b3dfa0]',  // Light green
    'bg-[#dfdfdf]',  // Light gray
    'bg-[#ff7b60]',  // Coral
    'bg-[#e6f388]',  // Light yellow
    'bg-[#b9b29e]',  // Beige
  ];

  const queenPositions = new Set(
    solution.map(([row, col]) => `${row},${col}`)
  );

  return (
    <GameCard gameInfo={getGameInfo('queens')}>
      <div className="text-center">
        <h4 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">
          Queens Solution
        </h4>
        
        <div 
          className="grid gap-0.5 mx-auto my-4 bg-slate-200 dark:bg-slate-700 p-1 rounded-lg" 
          style={{ 
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            width: `${Math.min(gridSize * 40, 320)}px`
          }}
        >
          {board.map((row, rowIndex) => 
            row.map((cellColor, colIndex) => {
              const isQueen = queenPositions.has(`${rowIndex},${colIndex}`);
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`aspect-square flex items-center justify-center ${colorClasses[cellColor % colorClasses.length]}`}
                >
                  {isQueen && (
                    <span className="text-xl text-slate-800 dark:text-slate-900" aria-label="Queen">♛</span>
                  )}
                </div>
              );
            })
          )}
        </div>
        
        <div className="text-sm text-slate-600 dark:text-slate-400 mt-4">
          <p>Queens requires placing queens on a chess board so they don't threaten each other.</p>
        </div>
      </div>
    </GameCard>
  );
};

export default QueensSolution;