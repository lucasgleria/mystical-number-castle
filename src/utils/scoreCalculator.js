// Utilitário para cálculo de score do Mystical Number Castle

export function calculateScore(attemptsUsed, minRange, maxRange, difficulty) {
  const range = maxRange - minRange;
  let multiplier = 1;
  if (difficulty === 'medium') multiplier = 2;
  if (difficulty === 'hard') multiplier = 3;
  if (attemptsUsed <= 0) return 0;
  return Math.round((range / attemptsUsed) * multiplier);
} 