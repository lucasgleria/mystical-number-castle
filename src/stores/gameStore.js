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
    leaderboard: [],
    // Estados de transição
    isTransitioning: false,
    isGameEntering: false,
    transitionPhase: 'idle', // 'idle', 'castle-zoom', 'fade-to-black', 'game-entrance'
    animationProgress: 0, // 0-100 para controle de progresso
    overlayVisible: false, // controla visibilidade do overlay preto
    lastGuessFeedback: null, // { type: 'correct'|'tooHigh'|'tooLow'|'close'|'sad', value: number }
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
      console.log('gameStore: startGame called');
      // Iniciar transição para o castelo
      this.isTransitioning = true;
      this.transitionPhase = 'castle-zoom';
      this.animationProgress = 0;
      console.log('gameStore: States updated - isTransitioning:', this.isTransitioning, 'phase:', this.transitionPhase);
    },
    
    updateTransitionProgress(progress) {
      this.animationProgress = progress;
      console.log('gameStore: Progress updated to', progress.toFixed(1) + '%');
    },
    
    completeCastleZoom() {
      console.log('Completing castle zoom');
      this.transitionPhase = 'fade-to-black';
      this.animationProgress = 50;
    },
    
    completeFadeToBlack() {
      console.log('Completing fade to black');
      this.transitionPhase = 'game-entrance';
      this.animationProgress = 75;
      // Gerar número alvo e configurar jogo
      this.targetNumber = Math.floor(Math.random() * (this.maxRange - this.minRange + 1)) + this.minRange;
      this.attemptsUsed = 0;
      this.gameWon = false;
      this.currentScreen = 'game';
      this.isTransitioning = false;
      this.isGameEntering = true;
    },
    
    completeGameEntrance() {
      console.log('Completing game entrance');
      this.isGameEntering = false;
      this.transitionPhase = 'idle';
      this.animationProgress = 100;
    },
    
    makeGuess(guess) {
      if (this.currentScreen !== 'game') return;
      this.attemptsUsed++;
      if (this.maxAttempts[this.difficulty] !== Infinity) {
        this.attemptsLeft--;
      }
      if (guess === this.targetNumber) {
        this.lastGuessFeedback = { type: 'correct', value: guess };
        this.gameWon = true;
        this.endGame(true);
        return;
      }
      if (this.attemptsLeft <= 0) {
        this.lastGuessFeedback = { type: 'sad', value: guess };
        this.gameWon = false;
        this.endGame(false);
        return;
      }
      // Feedback: muito alto, muito baixo, próximo
      const diff = Math.abs(guess - this.targetNumber);
      if (guess > this.targetNumber) {
        this.lastGuessFeedback = diff <= 5
          ? { type: 'close', value: guess, direction: 'down' }
          : { type: 'tooHigh', value: guess };
      } else if (guess < this.targetNumber) {
        this.lastGuessFeedback = diff <= 5
          ? { type: 'close', value: guess, direction: 'up' }
          : { type: 'tooLow', value: guess };
      }
    },
    
    endGame(won) {
      this.gameWon = won;
      // Futuro: addScoreToLeaderboard, saveLeaderboard
      this.currentScreen = 'ending';
    },
    
    addScoreToLeaderboard() {
      // Placeholder - será implementado na Fase 4
    },
    
    saveLeaderboard() {
      // Placeholder - será implementado na Fase 4
    },
    
    loadLeaderboard() {
      // Placeholder - será implementado na Fase 4
    },
    showOverlay() {
      this.overlayVisible = true;
    },
    hideOverlay() {
      this.overlayVisible = false;
    }
  },
  getters: {
    currentRangeDisplay: (state) => {
      const rangeSize = state.maxRange - state.minRange + 1;
      return `${state.minRange} to ${state.maxRange} (${rangeSize} numbers)`;
    },
    
    // Getters para controle de animação
    isInTransition: (state) => {
      return state.isTransitioning || state.isGameEntering;
    },
    
    isCastleZooming: (state) => {
      return state.transitionPhase === 'castle-zoom';
    },
    
    isFadingToBlack: (state) => {
      return state.transitionPhase === 'fade-to-black';
    },
    
    isInGameEntrance: (state) => {
      return state.transitionPhase === 'game-entrance';
    },

    genieFeedback: (state) => {
      if (!state.lastGuessFeedback) {
        return {
          expression: 'idle',
          message: "Estou pensando em um número... Consegue adivinhar?"
        };
      }
      const { type, direction } = state.lastGuessFeedback;
      switch (type) {
        case 'correct':
          return {
            expression: 'correct',
            message: `Parabéns! Você acertou o número!`
          };
        case 'tooHigh':
          return {
            expression: 'tooHigh',
            message: `Muito alto! Tente um número menor.`
          };
        case 'tooLow':
          return {
            expression: 'tooLow',
            message: `Muito baixo! Tente um número maior.`
          };
        case 'close':
          return {
            expression: 'close',
            message: direction === 'up'
              ? 'Quase! Um pouco mais alto.'
              : 'Quase! Um pouco mais baixo.'
          };
        case 'sad':
          return {
            expression: 'sad',
            message: `Suas tentativas acabaram! O número era ${state.targetNumber}.`
          };
        default:
          return {
            expression: 'idle',
            message: "Estou pensando em um número... Consegue adivinhar?"
          };
      }
    }
  }
});