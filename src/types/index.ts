export interface Solution {
  pinpoint: string;
  crossclimb: [number, string][];
  zip: number[];
  zip_sequence: number[];
  zip_grid: number;
  queens: [number, number][];
  queens_board: number[][];
  queens_grid: number;
  tango: string;
}

export interface SolutionResponse {
  solutions: {
    data: Solution;
  };
  date: string;
}

export interface DatesResponse {
  dates: string[];
}

export type GameType = "pinpoint" | "crossclimb" | "zip" | "queens" | "tango";

export interface GameInfo {
  name: string;
  description: string;
  color: string;
  darkColor: string;
  icon: string;
}
