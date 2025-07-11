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
    setScreen(screen) {
      this.currentScreen = screen;
    },
    
    setPlayerName(name) {
      this.playerName = name;
    },
    
    setRange(min, max) {
      this.minRange = min;
      this.maxRange = max;
    },
    
    setDifficulty(difficulty) {
      this.difficulty = difficulty;
      this.attemptsLeft = this.maxAttempts[difficulty];
    },
    
    startGame() {
      this.targetNumber = Math.floor(Math.random() * (this.maxRange - this.minRange + 1)) + this.minRange;
      this.attemptsUsed = 0;
      this.gameWon = false;
      this.currentScreen = 'game';
    },
    
    makeGuess(guess) {
      // Placeholder - será implementado na Fase 3
    },
    
    endGame(won) {
      // Placeholder - será implementado na Fase 3
    },
    
    addScoreToLeaderboard() {
      // Placeholder - será implementado na Fase 4
    },
    
    saveLeaderboard() {
      // Placeholder - será implementado na Fase 4
    },
    
    loadLeaderboard() {
      // Placeholder - será implementado na Fase 4
    }
  },
  getters: {
    currentRangeDisplay: (state) => {
      const rangeSize = state.maxRange - state.minRange + 1;
      return `${state.minRange} to ${state.maxRange} (${rangeSize} numbers)`;
    }
  }
});