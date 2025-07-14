<template>
  <div class="game-screen-bg">
    <div class="game-content">
      <!-- Genie Placeholder -->
      <div class="genie-area">
        <GenieSprite :expression="genieFeedback.expression" />
      </div>
      <!-- Speech Bubble Placeholder -->
      <SpeechBubble :message="genieFeedback.message" />
      <!-- Painel de Status Placeholder -->
      <GameStatsPanel
        :currentRange="gameStore.currentRangeDisplay"
        :attemptsUsed="gameStore.attemptsUsed"
        :attemptsLeft="gameStore.attemptsLeft"
        :maxAttempts="maxAttempts"
        :difficulty="gameStore.difficulty"
      />
      <!-- Input de Palpite -->
      <div class="guess-input-area">
        <NumberInput
          label="Seu palpite"
          placeholder="Digite um número..."
          v-model="userGuess"
          :min="gameStore.minRange"
          :max="gameStore.maxRange"
        />
        <div v-if="guessError" style="color:#c0392b; font-size:0.98rem; margin-bottom:4px;">{{ guessError }}</div>
        <ActionButton
          label="Enviar Palpite"
          :disabled="userGuess === null"
          @click="handleGuess"
        />
        <ActionButton
          label="Desistir"
          :disabled="false"
          @click="handleGiveUp"
          style="background: linear-gradient(90deg, #b24592 0%, #f15f79 100%); margin-top: 2px;"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import GenieSprite from '../components/GenieSprite.vue';
import SpeechBubble from '../components/SpeechBubble.vue';
import GameStatsPanel from '../components/GameStatsPanel.vue';
import NumberInput from '../components/NumberInput.vue';
import ActionButton from '../components/ActionButton.vue';
import { useGameStore } from '../stores/gameStore';
import { computed, ref, onMounted, nextTick } from 'vue';
import { gsap } from 'gsap';

const gameStore = useGameStore();

const maxAttempts = computed(() => gameStore.maxAttempts[gameStore.difficulty] ?? '-');
const genieFeedback = computed(() => gameStore.genieFeedback);

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
  gameStore.endGame(false);
}
</script>

<style scoped>
.game-screen-bg {
  min-height: 100vh;
  min-width: 100vw;
  background: url('@/assets/images/game-screen.png') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}
.game-content {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 32px 16px;
  background: rgba(255,255,255,0.08);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  backdrop-filter: blur(6px);
}
.genie-area {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.genie-placeholder {
  width: 100px;
  height: 100px;
  background: rgba(200,180,255,0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #6c3fc5;
  font-size: 1.2rem;
}
.speech-bubble-placeholder {
  min-height: 48px;
  width: 90%;
  background: rgba(255,255,255,0.7);
  border-radius: 16px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4b2e83;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.status-panel-placeholder {
  width: 90%;
  min-height: 40px;
  background: rgba(255,255,255,0.18);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 1rem;
  margin-bottom: 8px;
}
.guess-input-area {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.guess-input {
  width: 80%;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #bbaaff;
  font-size: 1.1rem;
  outline: none;
  margin-bottom: 8px;
}
.action-btn {
  width: 80%;
  padding: 10px 0;
  border-radius: 8px;
  border: none;
  background: linear-gradient(90deg, #f7b733 0%, #fc4a1a 100%);
  color: #fff;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  margin-bottom: 6px;
  transition: background 0.2s, transform 0.1s;
}
.action-btn:hover {
  background: linear-gradient(90deg, #fc4a1a 0%, #f7b733 100%);
  transform: scale(1.03);
}
.give-up {
  background: linear-gradient(90deg, #b24592 0%, #f15f79 100%);
}
.give-up:hover {
  background: linear-gradient(90deg, #f15f79 0%, #b24592 100%);
}
</style> 