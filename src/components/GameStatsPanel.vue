<template>
  <div class="stats-panel">
    <div class="stats-content">
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
    <button class="give-up-btn" @click="$emit('give-up')">Desistir</button>
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

defineEmits(['give-up']);

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
  width: 220px;
  min-height: 320px;
  background: rgba(255,255,255,0.18);
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.10);
  padding: 24px 18px 18px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  font-size: 1rem;
  color: #2d215a;
  backdrop-filter: blur(4px);
  gap: 16px;
}
.stats-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
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
.give-up-btn {
  margin-top: 18px;
  padding: 12px 0;
  border-radius: 12px;
  border: none;
  background: linear-gradient(90deg, #b24592 0%, #f15f79 100%);
  color: #fff;
  font-weight: bold;
  font-size: 1.08rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.2s, transform 0.1s;
}
.give-up-btn:hover {
  background: linear-gradient(90deg, #f15f79 0%, #b24592 100%);
  transform: scale(1.04);
}
</style> 