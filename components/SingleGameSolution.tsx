"use client";

import { Solution } from "@/types";
import { GameSlug, slugToGameKey } from "@/lib/games";
import PinpointSolution from "./games/PinpointSolution";
import CrossclimbSolution from "./games/CrossclimbSolution";
import QueensSolution from "./games/QueensSolution";
import ZipSolution from "./games/ZipSolution";
import TangoSolution from "./games/TangoSolution";
import MiniSudokuSolution from "./games/MiniSudokuSolution";

interface SingleGameSolutionProps {
  solution: Solution;
  gameSlug: GameSlug;
}

export default function SingleGameSolution({
  solution,
  gameSlug,
}: SingleGameSolutionProps) {
  const gameKey = slugToGameKey(gameSlug);

  return (
    <div className="container mx-auto px-0 py-0 sm:px-4 max-w-3xl animate-fadeIn">
      <div className="sm:pb-16">
        {gameKey === "pinpoint" && solution.pinpoint && (
          <PinpointSolution
            solution={solution.pinpoint}
            isExpanded={true}
            onToggle={() => {}}
          />
        )}
        {gameKey === "crossclimb" && solution.crossclimb && (
          <CrossclimbSolution
            solution={solution.crossclimb}
            isExpanded={true}
            onToggle={() => {}}
          />
        )}
        {gameKey === "queens" && solution.queens && (
          <QueensSolution
            solution={solution.queens}
            board={solution.queens_board}
            gridSize={solution.queens_grid}
            isExpanded={true}
            onToggle={() => {}}
          />
        )}
        {gameKey === "zip" && solution.zip && (
          <ZipSolution
            solution={solution.zip}
            sequence={solution.zip_sequence}
            gridSize={solution.zip_grid}
            isExpanded={true}
            onToggle={() => {}}
          />
        )}
        {gameKey === "tango" && solution.tango && (
          <TangoSolution
            solution={solution.tango}
            isExpanded={true}
            onToggle={() => {}}
          />
        )}
        {gameKey === "mini_sudoku" && solution.mini_sudoku && (
          <MiniSudokuSolution
            solution={solution.mini_sudoku}
            isExpanded={true}
            onToggle={() => {}}
          />
        )}
      </div>
    </div>
  );
}
