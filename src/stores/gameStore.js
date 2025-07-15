import { defineStore } from 'pinia';
import { calculateScore } from '../utils/scoreCalculator.js';

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
    transitionPhase: 'idle', // 'idle', 'fade-to-black', 'game-entrance'
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
      // Iniciar transição para o fade-to-black diretamente
      this.transitionPhase = 'fade-to-black';
    },
    
    updateTransitionProgress(progress) {
      // Remover todas as atribuições a this.animationProgress
    },
    
    completeFadeToBlack() {
      this.transitionPhase = 'game-entrance';
      // Gerar número alvo e configurar jogo
      this.targetNumber = Math.floor(Math.random() * (this.maxRange - this.minRange + 1)) + this.minRange;
      this.attemptsUsed = 0;
      this.gameWon = false;
      this.currentScreen = 'game';
    },
    
    completeGameEntrance() {
      this.transitionPhase = 'idle';
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
      if (won) {
        this.addScoreToLeaderboard();
      }
      this.saveLeaderboard();
    },
    
    addScoreToLeaderboard() {
      // Impede nomes duplicados (case-insensitive)
      const name = this.playerName.trim();
      if (!name) return;
      const nameLower = name.toLowerCase();
      // Remove entradas antigas com o mesmo nome
      this.leaderboard = this.leaderboard.filter(entry => entry.name.toLowerCase() !== nameLower);
      // Calcula score
      const score = calculateScore(this.attemptsUsed, this.minRange, this.maxRange, this.difficulty, this.maxAttempts);
      this.leaderboard.push({
        name,
        score,
        attempts: this.attemptsUsed,
        difficulty: this.difficulty
      });
      // Ordena: score desc, tentativas asc
      this.leaderboard.sort((a, b) => b.score - a.score || a.attempts - b.attempts);
      // Mantém apenas top 10 por dificuldade
      const byDiff = { easy: [], medium: [], hard: [] };
      for (const entry of this.leaderboard) {
        if (byDiff[entry.difficulty].length < 10) {
          byDiff[entry.difficulty].push(entry);
        }
      }
      // Junta todos para o leaderboard geral (All)
      this.leaderboard = [...byDiff.easy, ...byDiff.medium, ...byDiff.hard];
      // Top 10 geral (All) será filtrado na tela
    },
    
    saveLeaderboard() {
      try {
        localStorage.setItem('mysticalNumberCastleLeaderboard', JSON.stringify(this.leaderboard));
      } catch (e) {
        // Fallback: não salva
      }
    },
    
    loadLeaderboard() {
      try {
        const stored = localStorage.getItem('mysticalNumberCastleLeaderboard');
        if (stored) {
          this.leaderboard = JSON.parse(stored);
        }
      } catch (e) {
        this.leaderboard = [];
      }
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
    
    isInGameEntrance: (state) => {
      return state.transitionPhase === 'game-entrance';
    },

    genieFeedback: (state) => {
      // Primeira mensagem ao entrar no jogo
      if (!state.lastGuessFeedback) {
        return {
          expression: 'welcome',
          message: "Bem-vindo ao desafio! Estou pensando em um número... Consegue adivinhar?"
        };
      }
      const { type, value } = state.lastGuessFeedback;
      // Range proporcional para definir "far" ou "close"
      const range = state.maxRange - state.minRange;
      const diff = Math.abs(value - state.targetNumber);
      // Definir limites proporcionais
      const closeThreshold = Math.max(2, Math.round(range * 0.08)); // 8% do range ou mínimo 2
      const farThreshold = Math.max(8, Math.round(range * 0.25));   // 25% do range ou mínimo 8
      switch (type) {
        case 'correct':
          return {
            expression: 'end',
            message: `Congratulaations! You won!`
          };
        case 'sad':
          return {
            expression: 'end',
            message: `Your guesses have ended! The number was ${state.targetNumber}.`
          };
        default:
          if (diff <= closeThreshold) {
            return {
              expression: 'close',
              message: 'Almost there! You are really close.'
            };
          } else if (diff >= farThreshold) {
            return {
              expression: 'far',
              message: value > state.targetNumber
                ? 'Your guess is really above it.'
                : 'Your guess is really down it.'
            };
          } else {
            return {
              expression: 'far',
              message: value > state.targetNumber
                ? 'Still above, try a lower number.'
                : 'Still below, try a higher number.'
            };
          }
      }
    }
  }
});