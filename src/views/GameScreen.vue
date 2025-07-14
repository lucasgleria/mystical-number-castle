<template>
  <div class="game-screen-bg">
    <div class="game-layout-row">
      <!-- Painel lateral de status -->
      <div class="stats-panel-wrapper">
        <GameStatsPanel
          :currentRange="gameStore.currentRangeDisplay"
          :attemptsUsed="gameStore.attemptsUsed"
          :attemptsLeft="gameStore.attemptsLeft"
          :maxAttempts="maxAttempts"
          :difficulty="gameStore.difficulty"
          @give-up="handleGiveUp"
        />
      </div>
      <!-- Conteúdo principal -->
      <div class="game-main-content">
        <SpeechBubble :message="genieFeedback.message" />
        <div class="genie-area">
          <GenieSprite :expression="genieFeedback.expression" />
        </div>
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
        </div>
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
  gameStore.giveUp();
}
</script>

<style scoped>
.game-screen-bg {
  min-height: 100vh;
  min-width: 100vw;
  background: url('../assets/images/inside-castle.jpg') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}
.game-layout-row {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  gap: 0;
  width: 100%;
  max-width: 950px;
  min-height: 520px;
}
.stats-panel-wrapper {
  display: flex;
  align-items: stretch;
  /* Painel colado à esquerda, altura igual ao conteúdo principal */
  background: rgba(255,255,255,0.13);
  border-radius: 24px 0 0 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  padding: 0;
  min-width: 240px;
  max-width: 260px;
  min-height: 100%;
  z-index: 2;
}
.game-main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  background: rgba(255,255,255,0.08);
  border-radius: 0 24px 24px 0;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  backdrop-filter: blur(6px);
  padding: 32px 24px;
  min-width: 0;
  min-height: 520px;
}
.genie-area {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.guess-input-area {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
@media (max-width: 900px) {
  .game-layout-row {
    flex-direction: column;
    align-items: center;
    max-width: 98vw;
    min-height: unset;
  }
  .stats-panel-wrapper, .game-main-content {
    border-radius: 24px;
    min-width: 0;
    max-width: 98vw;
    width: 100%;
  }
  .stats-panel-wrapper {
    margin-bottom: 18px;
    border-radius: 24px;
  }
}
</style> 