import { GameInfo, GameType } from '../types';

export const GAMES: Record<GameType, GameInfo> = {
  pinpoint: {
    name: 'Pinpoint',
    description: 'Identify the common theme across four images',
    color: 'bg-blue-600',
    icon: 'Target'
  },
  crossclimb: {
    name: 'Crossclimb',
    description: 'Change one letter at a time to reach the target word',
    color: 'bg-purple-600',
    icon: 'ArrowUpRight'
  },
  zip: {
    name: 'Zip',
    description: 'Connect the dots in numerical order to reveal a pattern',
    color: 'bg-green-600',
    icon: 'ZapIcon'
  },
  queens: {
    name: 'Queens',
    description: 'Place queens on a chess board without threatening each other',
    color: 'bg-amber-600',
    icon: 'Crown'
  },
  tango: {
    name: 'Tango',
    description: 'Identify the pattern of binary digits',
    color: 'bg-red-600',
    icon: 'Shuffle'
  }
};

export const getGameInfo = (gameType: GameType): GameInfo => {
  return GAMES[gameType] || GAMES.pinpoint;
};