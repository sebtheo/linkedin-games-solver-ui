import React from "react";
import GameCard from "../GameCard";
import { getGameInfo } from "../../utils/gameUtils";

interface SudokuSolutionProps {
  solution: {
    solution: number[];
    grid_solution: number[][];
    grid_size: {
      rows: number;
      cols: number;
    };
    preset_cells: number[];
    name: string;
  };
  isExpanded: boolean;
  onToggle: () => void;
}

const SudokuSolution: React.FC<SudokuSolutionProps> = ({
  solution,
  isExpanded,
  onToggle,
}) => {
  const { grid_solution, preset_cells, name } = solution;
  const gridSize = grid_solution.length;

  const isPresetCell = (row: number, col: number) => {
    const index = row * gridSize + col;
    return preset_cells.includes(index);
  };

  const renderGrid = () => {
    const cellSize = 40;

    return (
      <div className="flex justify-center my-4">
        <div
          className="grid gap-0 border-2 border-slate-300 dark:border-slate-600"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${gridSize}, ${cellSize}px)`,
          }}
        >
          {grid_solution.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isPreset = isPresetCell(rowIndex, colIndex);
              const isBlockBorder = 
                (rowIndex % 2 === 0 && rowIndex !== 0) || 
                (colIndex % 3 === 0 && colIndex !== 0);

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    flex items-center justify-center text-lg font-medium
                    ${isPreset 
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200' 
                      : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                    }
                    ${isBlockBorder ? 'border-t-2 border-l-2' : 'border border-slate-200 dark:border-slate-600'}
                    ${rowIndex === 0 ? 'border-t-2' : ''}
                    ${colIndex === 0 ? 'border-l-2' : ''}
                    ${rowIndex === gridSize - 1 ? 'border-b-2' : ''}
                    ${colIndex === gridSize - 1 ? 'border-r-2' : ''}
                  `}
                  style={{ width: cellSize, height: cellSize }}
                >
                  {cell}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <GameCard
      gameInfo={getGameInfo("sudoku")}
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="text-center">
        <h4 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
          {name || "Sudoku Solution"}
        </h4>

        {renderGrid()}

        <div className="text-sm text-slate-600 dark:text-slate-400 mt-4">
          <p>
            Fill the 6x6 grid so that each row, column, and 2x3 block contains
            the numbers 1-6 without repetition.
          </p>
          <p className="mt-2 text-xs">
            Highlighted cells were preset in the original puzzle.
          </p>
        </div>
      </div>
    </GameCard>
  );
};

export default SudokuSolution;
