import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    currentScreen: 'meeting',
    playerName: '',
    minRange: 1,
    maxRange: 100,
    difficulty: null,
    targetNumber: null,
    attemptsUsed: 0,
    attemptsLeft: 0,
    maxAttempts: { easy: Infinity, medium: 20, hard: 10 },
    gameWon: false,
    leaderboard: []
  }),
  actions: {
    // setScreen, setPlayerName, setRange, setDifficulty, startGame, makeGuess, endGame, addScoreToLeaderboard, saveLeaderboard, loadLeaderboard
  },
  getters: {
    // currentRangeDisplay
  }
});