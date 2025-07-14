<template>
  <div class="stats-panel">
    <div class="stat-row">
      <span class="stat-label">Range:</span>
      <span class="stat-value">{{ currentRange }}</span>
    </div>
    <div class="stat-row">
      <span class="stat-label">Tentativas:</span>
      <span class="stat-value">{{ attemptsUsed }} / {{ maxAttemptsDisplay }}</span>
    </div>
    <div class="stat-row">
      <span class="stat-label">Restantes:</span>
      <span class="stat-value">{{ attemptsLeftDisplay }}</span>
    </div>
    <div class="stat-row">
      <span class="stat-label">Dificuldade:</span>
      <span class="stat-value">{{ difficultyLabel }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  currentRange: String,
  attemptsUsed: Number,
  attemptsLeft: Number,
  maxAttempts: [Number, String],
  difficulty: String
});

const difficultyLabel = computed(() => {
  switch (props.difficulty) {
    case 'easy': return 'Fácil';
    case 'medium': return 'Médio';
    case 'hard': return 'Difícil';
    default: return '-';
  }
});

const maxAttemptsDisplay = computed(() => {
  return props.maxAttempts === Infinity ? '∞' : props.maxAttempts;
});
const attemptsLeftDisplay = computed(() => {
  return props.attemptsLeft === Infinity ? '∞' : props.attemptsLeft;
});
</script>

<style scoped>
.stats-panel {
  width: 100%;
  max-width: 420px;
  background: rgba(255,255,255,0.18);
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.10);
  padding: 18px 24px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 1rem;
  color: #2d215a;
  backdrop-filter: blur(4px);
}
.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.stat-label {
  font-weight: 500;
  opacity: 0.85;
}
.stat-value {
  font-weight: bold;
  letter-spacing: 0.5px;
}
</style> 