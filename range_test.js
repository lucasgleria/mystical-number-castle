// Teste da nova fórmula que considera o range

function calculateScore(attemptsUsed, minRange, maxRange, difficulty, maxAttempts) {
  const range = maxRange - minRange;
  
  if (attemptsUsed <= 0) return 0;
  
  const basePoints = {
    easy: 100,
    medium: 200,
    hard: 400
  }[difficulty];
  
  const penaltyFactor = {
    easy: 0.5,
    medium: 1,
    hard: 1.5
  }[difficulty];
  
  const rangeMultiplier = Math.log10(range + 1) * 2;
  const adjustedBasePoints = basePoints * rangeMultiplier;
  const denominator = Math.max(1, maxAttempts[difficulty] - 1);
  const discount = adjustedBasePoints * ((attemptsUsed - 1) / denominator) * penaltyFactor;
  
  return Math.max(0, Math.round(adjustedBasePoints - discount));
}

const maxAttempts = { easy: Infinity, medium: 20, hard: 10 };

console.log('=== TESTE: INFLUÊNCIA DO RANGE NA PONTUAÇÃO ===\n');

// Teste 1: Diferentes ranges, mesma dificuldade e tentativas
console.log('Teste 1: Range 1-5 vs 1-50 vs 1-500 (2 tentativas, Hard)');
console.log('Range    | Range Size | Multiplier | Base Points | Final Score');
console.log('---------|------------|------------|-------------|------------');

const ranges = [
  { min: 1, max: 5, label: '1-5' },
  { min: 1, max: 50, label: '1-50' },
  { min: 1, max: 500, label: '1-500' }
];

ranges.forEach(range => {
  const rangeSize = range.max - range.min;
  const multiplier = Math.log10(rangeSize + 1) * 2;
  const basePoints = 400 * multiplier; // Hard difficulty
  const finalScore = calculateScore(2, range.min, range.max, 'hard', maxAttempts);
  
  console.log(`${range.label.padStart(8)} | ${rangeSize.toString().padStart(10)} | ${multiplier.toFixed(2).padStart(10)} | ${Math.round(basePoints).toString().padStart(11)} | ${finalScore.toString().padStart(10)}`);
});

console.log('\nTeste 2: Comparação de justiça');
console.log('Cenário A: Range 1-5, 2 tentativas, Hard');
console.log('Cenário B: Range 1-50, 5 tentativas, Hard');
console.log('Cenário C: Range 1-500, 8 tentativas, Hard');

const scenarioA = calculateScore(2, 1, 5, 'hard', maxAttempts);
const scenarioB = calculateScore(5, 1, 50, 'hard', maxAttempts);
const scenarioC = calculateScore(8, 1, 500, 'hard', maxAttempts);

console.log(`\nPontuações:`);
console.log(`Cenário A: ${scenarioA} pontos`);
console.log(`Cenário B: ${scenarioB} pontos`);
console.log(`Cenário C: ${scenarioC} pontos`);

console.log('\n=== VANTAGENS DA NOVA FÓRMULA ===');
console.log('✅ Ranges maiores dão mais pontos (justo)');
console.log('✅ Desconto proporcional à dificuldade');
console.log('✅ Sistema balanceado entre range e tentativas');
console.log('✅ Logaritmo suaviza diferenças extremas');
console.log('✅ Nunca pontuação negativa'); 