import { GameInfo, GameType } from "../types";

export const GAMES: Record<GameType, GameInfo> = {
  pinpoint: {
    name: "Pinpoint",
    description: "Identify the common theme across four images",
    color: "bg-blue-600",
    darkColor: "dark:bg-blue-400",
    icon: "Target",
  },
  crossclimb: {
    name: "Crossclimb",
    description: "Change one letter at a time to reach the target word",
    color: "bg-purple-600",
    darkColor: "dark:bg-purple-400",
    icon: "ArrowUpRight",
  },
  zip: {
    name: "Zip",
    description: "Connect the dots in numerical order to reveal a pattern",
    color: "bg-green-600",
    darkColor: "dark:bg-green-400",
    icon: "ZapIcon",
  },
  queens: {
    name: "Queens",
    description: "Place queens on a chess board without threatening each other",
    color: "bg-amber-600",
    darkColor: "dark:bg-amber-400",
    icon: "Crown",
  },
  tango: {
    name: "Tango",
    description: "Identify the pattern of binary digits",
    color: "bg-red-600",
    darkColor: "dark:bg-red-400",
    icon: "Shuffle",
  },
  mini_sudoku: {
    name: "Mini Sudoku",
    description: "Fill the grid with numbers following Sudoku rules",
    color: "bg-indigo-600",
    darkColor: "dark:bg-indigo-400",
    icon: "Grid3X3",
  },
};

export const getGameInfo = (gameType: GameType): GameInfo => {
  return GAMES[gameType] || GAMES.pinpoint;
};
