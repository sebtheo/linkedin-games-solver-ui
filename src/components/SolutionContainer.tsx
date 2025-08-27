import React, { useState } from "react";
import { Solution } from "../types";
import PinpointSolution from "./games/PinpointSolution";
import CrossclimbSolution from "./games/CrossclimbSolution";
import QueensSolution from "./games/QueensSolution";
import ZipSolution from "./games/ZipSolution";
import TangoSolution from "./games/TangoSolution";
import MiniSudokuSolution from "./games/MiniSudokuSolution";

interface SolutionContainerProps {
  solution: Solution;
  date: string;
  onToggle: (game: string) => void;
}

const SolutionContainer: React.FC<SolutionContainerProps> = ({ solution }) => {
  const [expandedGames, setExpandedGames] = useState<Record<string, boolean>>({
    pinpoint: true,
    crossclimb: true,
    queens: true,
    zip: true,
    tango: true,
    mini_sudoku: true,
  });

  const toggleGame = (game: string) => {
    setExpandedGames((prev) => ({
      ...prev,
      [game]: !prev[game],
    }));
  };

  return (
    <div className="container mx-auto px-0 py-0 sm:px-4 max-w-3xl animate-fadeIn">
      <div className="sm:pb-16">
        {solution.pinpoint ? (
          <PinpointSolution
            solution={solution.pinpoint}
            isExpanded={expandedGames["pinpoint"]}
            onToggle={() => toggleGame("pinpoint")}
          />
        ) : (
          <div className="text-center text-slate-600 dark:text-slate-400">
            No solution found for Pinpoint
          </div>
        )}
        {solution.crossclimb ? (
          <CrossclimbSolution
            solution={solution.crossclimb}
            isExpanded={expandedGames["crossclimb"]}
            onToggle={() => toggleGame("crossclimb")}
          />
        ) : (
          <div className="text-center text-slate-600 dark:text-slate-400">
            No solution found for Crossclimb
          </div>
        )}

        {solution.queens ? (
          <QueensSolution
            solution={solution.queens}
            board={solution.queens_board}
            gridSize={solution.queens_grid}
            isExpanded={expandedGames["queens"]}
            onToggle={() => toggleGame("queens")}
          />
        ) : (
          <div className="text-center text-slate-600 dark:text-slate-400">
            No solution found for Queens
          </div>
        )}

        {solution.zip ? (
          <ZipSolution
            solution={solution.zip}
            sequence={solution.zip_sequence}
            gridSize={solution.zip_grid}
            isExpanded={expandedGames["zip"]}
            onToggle={() => toggleGame("zip")}
          />
        ) : (
          <div className="text-center text-slate-600 dark:text-slate-400">
            No solution found for Zip
          </div>
        )}

        {solution.tango ? (
          <TangoSolution
            solution={solution.tango}
            isExpanded={expandedGames["tango"]}
            onToggle={() => toggleGame("tango")}
          />
        ) : (
          <div className="text-center text-slate-600 dark:text-slate-400">
            No solution found for Tango
          </div>
        )}

        {solution.mini_sudoku ? (
          <MiniSudokuSolution
            solution={solution.mini_sudoku}
            isExpanded={expandedGames["mini_sudoku"]}
            onToggle={() => toggleGame("mini_sudoku")}
          />
        ) : (
          <div className="text-center text-slate-600 dark:text-slate-400">
            No solution found for Mini Sudoku
          </div>
        )}
      </div>
    </div>
  );
};

export default SolutionContainer;
