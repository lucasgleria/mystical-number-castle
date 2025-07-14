<template>
  <div class="ending-screen">
    <div class="title-section">
      <h1 class="main-title">MYSTICAL NUMBER CASTLE</h1>
      <h2 class="subtitle">THE GENIE'S CHALLENGE</h2>
    </div>
    <div class="main-container">
      <div class="ending-panel">
        <div class="ending-result" :class="{ win: gameWon, lose: !gameWon }">
          <template v-if="gameWon">
            <span class="result-icon">🏆</span>
            <p>
              Parabéns, <b>{{ playerName }}</b>!<br>
              Você acertou o número <b>{{ targetNumber }}</b> em <b>{{ attemptsUsed }}</b> tentativas!
            </p>
            <div class="motivational-message">Você conquistou o castelo! ✨</div>
          </template>
          <template v-else>
            <span class="result-icon">😢</span>
            <p>
              Game Over.<br>
              O número era <b>{{ targetNumber }}</b>.<br>
              Tente novamente!
            </p>
            <div class="motivational-message">Não desista, tente mais uma vez!</div>
          </template>
        </div>
        <div class="leaderboard-section">
          <h3>Leaderboard</h3>
          <div class="leaderboard-tabs">
            <button
              v-for="tab in leaderboardTabs"
              :key="tab.value"
              :class="{ active: currentLeaderboardFilter === tab.value }"
              @click="currentLeaderboardFilter = tab.value"
            >
              {{ tab.label }}
            </button>
          </div>
          <LeaderboardTable
            :leaderboardData="filteredLeaderboard"
            :selectedDifficulty="currentLeaderboardFilter"
            :highlightName="playerName"
            :showMedals="true"
          />
        </div>
        <ActionButton
          class="play-again-btn"
          label="Jogar Novamente"
          @click="handlePlayAgain"
        >
          <template #icon>🔄</template>
        </ActionButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useGameStore } from '../stores/gameStore';
import LeaderboardTable from '../components/LeaderboardTable.vue';
import ActionButton from '../components/ActionButton.vue';

const gameStore = useGameStore();

const playerName = computed(() => gameStore.playerName);
const targetNumber = computed(() => gameStore.targetNumber);
const attemptsUsed = computed(() => gameStore.attemptsUsed);
const gameWon = computed(() => gameStore.gameWon);

const leaderboardTabs = [
  { label: 'All', value: 'all' },
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
];
const currentLeaderboardFilter = ref('all');

const filteredLeaderboard = computed(() => {
  if (currentLeaderboardFilter.value === 'all') {
    return gameStore.leaderboard.slice(0, 10);
  }
  return gameStore.leaderboard
    .filter(entry => entry.difficulty === currentLeaderboardFilter.value)
    .slice(0, 10);
});

function handlePlayAgain() {
  gameStore.setPlayerName('');
  gameStore.setRange(1, 100);
  gameStore.setDifficulty(null);
  gameStore.setScreen('meeting');
}
</script>

<style lang="scss">
@import '../assets/styles/_ending-screen.scss';
.result-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 0.5rem;
}
.motivational-message {
  margin-top: 0.7rem;
  font-size: 1.1rem;
  color: $accent-gold;
  text-shadow: 0 0 8px rgba(255,255,255,0.5);
  font-weight: 600;
}
.play-again-btn {
  margin-top: 1.2rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
}
</style> 
