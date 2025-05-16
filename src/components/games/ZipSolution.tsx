import React from 'react';
import GameCard from '../GameCard';
import { getGameInfo } from '../../utils/gameUtils';

interface ZipSolutionProps {
  solution: number[];
  sequence: number[];
  gridSize: number;
}

const ZipSolution: React.FC<ZipSolutionProps> = ({ solution, sequence, gridSize }) => {
  // Render the grid with lines connecting dots in sequence
  const renderGrid = () => {
    const gridWidth = 240;
    const cellSize = gridWidth / gridSize;
    
    // Calculate positions of dots on the grid
    const dotPositions = Array.from({ length: gridSize * gridSize }, (_, index) => {
      const row = Math.floor(index / gridSize);
      const col = index % gridSize;
      return {
        x: col * cellSize + cellSize / 2,
        y: row * cellSize + cellSize / 2,
        index
      };
    });
    
    // Create path for solution
    const pathPoints = solution.map(index => {
      const dot = dotPositions.find(pos => pos.index === index);
      return dot ? `${dot.x},${dot.y}` : '';
    }).filter(Boolean).join(' L ');
    
    return (
      <div className="relative mx-auto my-4" style={{ width: gridWidth, height: gridWidth }}>
        {/* Grid background */}
        <div 
          className="absolute inset-0 grid bg-green-50 dark:bg-green-900/30 rounded-md"
          style={{ 
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`
          }}
        >
          {Array.from({ length: gridSize * gridSize }).map((_, i) => (
            <div key={i} className="border border-green-200 dark:border-green-800"></div>
          ))}
        </div>
        
        {/* SVG for lines and dots */}
        <svg 
          width={gridWidth} 
          height={gridWidth} 
          viewBox={`0 0 ${gridWidth} ${gridWidth}`} 
          className="absolute inset-0"
        >
          {/* Path for the solution */}
          <path
            d={`M ${pathPoints}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-green-600 dark:text-green-400"
          />
          
          {/* Dots */}
          {dotPositions.map((dot) => {
            const isHighlighted = sequence.includes(dot.index);
            const dotSize = isHighlighted ? 4 : 2;
            
            return (
              <circle
                key={dot.index}
                cx={dot.x}
                cy={dot.y}
                r={dotSize}
                className={isHighlighted 
                  ? "fill-green-600 dark:fill-green-400" 
                  : "fill-green-400 dark:fill-green-700"}
              />
            );
          })}
          
          {/* Sequence Numbers */}
          {sequence.map((index, i) => {
            const dot = dotPositions.find(pos => pos.index === index);
            if (!dot) return null;
            
            return (
              <g key={`seq-${index}`}>
                <circle
                  cx={dot.x}
                  cy={dot.y}
                  r={8}
                  className="fill-green-600 dark:fill-green-800"
                />
                <text
                  x={dot.x}
                  y={dot.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-white text-xs font-bold"
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <GameCard gameInfo={getGameInfo('zip')}>
      <div className="text-center">
        <h4 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">
          Zip Solution
        </h4>
        
        {renderGrid()}
        
        <div className="text-sm text-slate-600 dark:text-slate-400 mt-4">
          <p>Zip requires connecting dots in numerical order to reveal a hidden pattern.</p>
        </div>
      </div>
    </GameCard>
  );
};

export default ZipSolution;