// Utilitário para cálculo de score do Mystical Number Castle

export function calculateScore(attemptsUsed, minRange, maxRange, difficulty, maxAttempts) {
  const range = maxRange - minRange;
  
  // Se não acertou, não pontua
  if (attemptsUsed <= 0) return 0;
  
  // Pontuação base por dificuldade
  const basePoints = {
    easy: 100,
    medium: 200,
    hard: 400
  }[difficulty];
  
  // Fator de penalidade por dificuldade
  const penaltyFactor = {
    easy: 0.5,
    medium: 1,
    hard: 1.5
  }[difficulty];
  
  // Multiplicador baseado no range (usando logaritmo para suavizar)
  const rangeMultiplier = Math.log10(range + 1) * 2;
  
  // Pontuação base ajustada pelo range
  const adjustedBasePoints = basePoints * rangeMultiplier;
  
  // Evita divisão por zero
  const denominator = Math.max(1, maxAttempts[difficulty] - 1);
  
  // Desconto proporcional
  const discount = adjustedBasePoints * ((attemptsUsed - 1) / denominator) * penaltyFactor;
  
  // Pontuação final, nunca menor que zero
  return Math.max(0, Math.round(adjustedBasePoints - discount));
} 