import React from "react";
import { Sun, Moon } from "lucide-react";
import GameCard from "../GameCard";
import { getGameInfo } from "../../utils/gameUtils";

interface TangoSolutionProps {
  solution: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const TangoSolution: React.FC<TangoSolutionProps> = ({
  solution,
  isExpanded,
  onToggle,
}) => {
  return (
    <GameCard
      gameInfo={getGameInfo("tango")}
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="text-center">
        <h4 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">
          Today's Pattern
        </h4>

        <div className="grid grid-cols-6 gap-2 max-w-sm mx-auto mb-6">
          {solution.split("").map((bit, index) => (
            <div
              key={index}
              className={`aspect-square rounded-lg flex items-center justify-center ${
                bit === "0"
                  ? "bg-yellow-100 dark:bg-yellow-900/30"
                  : "bg-slate-100 dark:bg-slate-800"
              }`}
            >
              {bit === "0" ? (
                <Sun
                  size={24}
                  className="text-yellow-500 dark:text-yellow-400"
                />
              ) : (
                <Moon
                  size={24}
                  className="text-slate-600 dark:text-slate-400"
                />
              )}
            </div>
          ))}
        </div>

        <div className="text-sm text-slate-600 dark:text-slate-400 mt-4">
          <p>
            Tango challenges you to identify the pattern in a series of binary
            digits.
          </p>
        </div>
      </div>
    </GameCard>
  );
};

export default TangoSolution;
