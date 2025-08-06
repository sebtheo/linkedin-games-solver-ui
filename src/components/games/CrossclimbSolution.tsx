import React from "react";
import GameCard from "../GameCard";
import { getGameInfo } from "../../utils/gameUtils";

interface CrossclimbSolutionProps {
  solution: [number, string][];
  isExpanded: boolean;
  onToggle: () => void;
}

const CrossclimbSolution: React.FC<CrossclimbSolutionProps> = ({
  solution,
  isExpanded,
  onToggle,
}) => {
  return (
    <GameCard
      gameInfo={getGameInfo("crossclimb")}
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="flex flex-col items-center">
        <div className="flex flex-col space-y-2 w-full max-w-xs">
          {solution.map(([step, word], index) => (
            <div key={step} className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-purple-600 dark:bg-purple-400 text-white flex items-center justify-center text-sm font-medium">
                {step}
              </div>
              <div className="flex-1">
                <div className="bg-purple-50 dark:bg-purple-900/30 p-2 rounded-md flex justify-center">
                  {word.split("").map((letter, letterIndex) => {
                    const isChanged =
                      index > 0 &&
                      solution[index - 1][1].charAt(letterIndex) !== letter;

                    return (
                      <span
                        key={letterIndex}
                        className={`text-xl font-mono font-bold ${
                          isChanged
                            ? "text-purple-600 dark:text-purple-400"
                            : "text-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {letter}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-sm text-slate-600 dark:text-slate-400 mt-6">
          <p>
            Crossclimb requires changing one letter at a time to reach the
            target word.
          </p>
        </div>
      </div>
    </GameCard>
  );
};

export default CrossclimbSolution;
