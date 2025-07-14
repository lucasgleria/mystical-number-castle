<template>
  <div class="game-screen-bg">
    <div class="game-screen-container">
      <!-- Painel lateral de status -->
      <aside class="status-panel">
        <div class="status-title">Adventurer's Quest</div>
        <div class="status-info">
          <div class="status-row">
            <span class="status-label">Current Range</span>
            <span class="status-value">{{ gameStore.minRange }} - {{ gameStore.maxRange }}</span>
          </div>
          <div class="status-row">
            <span class="status-label">Attempts</span>
            <span class="status-value">{{ gameStore.attemptsUsed }} / {{ maxAttempts }}</span>
          </div>
          <div class="status-row attempts-left">
            <span>{{ gameStore.attemptsLeft }} left</span>
          </div>
        </div>
        <div class="status-row attempts-used">Attempts Used {{ gameStore.attemptsUsed }}/{{ maxAttempts }}</div>
        <ActionButton label="Give Up" @click="handleGiveUp" class="give-up-btn" />
      </aside>
      <!-- Área principal -->
      <main class="main-panel">
        <div class="character-area">
          <div class="character-box">
            <SpeechBubble :message="genieFeedback.message" />
            <div class="genie-wrapper">
              <GenieSprite :expression="genieFeedback.expression" />
            </div>
          </div>
        </div>
        <div class="guess-section">
          <div class="guess-title">Make Your Guess</div>
          <div class="guess-subtitle">Enter a number between {{ gameStore.minRange }} and {{ gameStore.maxRange }}</div>
          <div class="guess-input-area section" v-if="!isGameOver">
            <NumberInput
              label="Your guess"
              placeholder="Enter your guess..."
              v-model="userGuess"
              :min="gameStore.minRange"
              :max="gameStore.maxRange"
            />
            <div v-if="guessError" class="error-message">{{ guessError }}</div>
            <ActionButton
              label="Submit Guess"
              :disabled="userGuess === null"
              @click="handleGuess"
              class="main-action-btn submit-guess-btn"
            />
          </div>
          <div v-else class="end-game-btn-area section">
            <ActionButton label="End Game" @click="handleEndGame" class="main-action-btn submit-guess-btn" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import GenieSprite from '../components/game/GenieSprite.vue';
import SpeechBubble from '../components/common/SpeechBubble.vue';
import GameStatsPanel from '../components/game/GameStatsPanel.vue';
import NumberInput from '../components/game/NumberInput.vue';
import ActionButton from '../components/common/ActionButton.vue';
import { useGameStore } from '../stores/gameStore';
import { computed, ref, onMounted, nextTick } from 'vue';
import { gsap } from 'gsap';

const gameStore = useGameStore();

const maxAttempts = computed(() => gameStore.maxAttempts[gameStore.difficulty] ?? '-');
const genieFeedback = computed(() => gameStore.genieFeedback);
const isGameOver = computed(() => {
  // O jogo termina quando o feedback é 'correct' ou 'sad' (acerto ou derrota)
  return gameStore.lastGuessFeedback && ['correct', 'sad'].includes(gameStore.lastGuessFeedback.type);
});

const userGuess = ref(null);
const guessError = ref('');

onMounted(async () => {
  await nextTick();
  gsap.set('.global-overlay', { opacity: 1 });
  gsap.to('.global-overlay', {
    opacity: 0,
    duration: 5,
    onComplete: () => {
      gameStore.hideOverlay();
    }
  });
});

function handleGuess() {
  const guessNum = Number(userGuess.value);
  if (
    userGuess.value === null ||
    isNaN(guessNum) ||
    guessNum < gameStore.minRange ||
    guessNum > gameStore.maxRange
  ) {
    guessError.value = `Digite um número entre ${gameStore.minRange} e ${gameStore.maxRange}`;
    return;
  }
  guessError.value = '';
  gameStore.makeGuess(guessNum);
  userGuess.value = null;
}

function handleGiveUp() {
  gameStore.setScreen('meeting');
}

async function handleEndGame() {
  // Inicia fade-in do overlay preto
  gameStore.showOverlay();
  await nextTick();
  gsap.set('.global-overlay', { opacity: 0 });
  gsap.to('.global-overlay', {
    opacity: 1,
    duration: 1.2,
    onComplete: () => {
      // Troca para EndingScreen
      gameStore.currentScreen = 'ending';
      // Fade-out do overlay
      gsap.to('.global-overlay', {
        opacity: 0,
        duration: 5,
        onComplete: () => {
          gameStore.hideOverlay();
        }
      });
    }
  });
}
</script> 