<template>
  <div class="meeting-screen">
    <!-- Overlay de fade-in -->
    <div class="fade-overlay" ref="fadeOverlay"></div>
    
    <!-- Título Principal (acima do conteúdo) -->
    <div class="title-section">
      <h1 class="main-title">MYSTICAL NUMBER CASTLE</h1>
      <h2 class="subtitle">THE GENIE'S CHALLENGE</h2>
    </div>

    <!-- Container principal com formulário e imagem -->
    <div class="main-container">
      <!-- Formulário à esquerda -->
      <div class="form-container">
        <!-- Seção de Identidade Mágica -->
        <div class="section">
          <h3 class="section-title">Your Magical Identity</h3>
          <p class="section-description">Enter your mystical name to begin your adventure</p>
          <TextInput
            v-model="gameStore.playerName"
            label="Enter your name"
            placeholder="Type your magical name..."
            :maxLength="20"
          />
        </div>

        <!-- Seção de Range de Números -->
        <div class="section">
          <h3 class="section-title">Set Your Number Range</h3>
          <p class="section-description">Choose the range of numbers for your challenge</p>
          <div class="range-inputs">
            <NumberInput
              v-model="gameStore.minRange"
              label="Minimum"
              placeholder="1"
              :min="1"
              :max="gameStore.maxRange - 1"
            />
            <NumberInput
              v-model="gameStore.maxRange"
              label="Maximum"
              placeholder="100"
              :min="gameStore.minRange + 1"
              :max="1000"
            />
          </div>
          <div class="range-display">
            Current range: {{ gameStore.currentRangeDisplay }}
          </div>
          <div v-if="!isRangeValid" class="error-message">
            Minimum must be less than maximum
          </div>
        </div>

        <!-- Seção de Dificuldade -->
        <div class="section">
          <h3 class="section-title">Select Difficulty</h3>
          <p class="section-description">Choose your challenge level</p>
          <div class="difficulty-grid">
            <DifficultyButton
              v-for="difficulty in difficulties"
              :key="difficulty.value"
              :label="difficulty.label"
              :value="difficulty.value"
              :isSelected="gameStore.difficulty === difficulty.value"
              @click="gameStore.setDifficulty"
            />
          </div>
          <div class="difficulty-descriptions">
            <div v-for="difficulty in difficulties" :key="difficulty.value" class="difficulty-description">
              <strong>{{ difficulty.label }}:</strong> {{ difficulty.description }}
            </div>
          </div>
        </div>

        <!-- Botão de Iniciar Aventura -->
        <div class="section">
          <ActionButton
            label="Begin Journey"
            :disabled="!canStartGame || isFading"
            @click="handleBeginJourney"
            class="begin-journey-btn"
          />
        </div>
      </div>

      <!-- Imagem à direita -->
      <div class="image-container">
        <img src="../assets/images/castle.png" alt="Mystical Castle" class="inspiration-image" />
        <p class="image-caption">Enter the Mystical Number Catle where the Genie awaits to challenge your mind...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, nextTick } from 'vue';
import { useGameStore } from '../stores/gameStore';
import { gsap } from 'gsap';
import TextInput from '../components/TextInput.vue';
import NumberInput from '../components/NumberInput.vue';
import ActionButton from '../components/ActionButton.vue';
import DifficultyButton from '../components/DifficultyButton.vue';

const gameStore = useGameStore();
const fadeOverlay = ref(null);
const isFading = ref(false);

const difficulties = [
  {
    label: 'Easy',
    value: 'easy',
    description: 'Unlimited guesses - perfect for beginners!'
  },
  {
    label: 'Medium',
    value: 'medium',
    description: '20 attempts - moderate challenge with clues'
  },
  {
    label: 'Hard',
    value: 'hard',
    description: '10 attempts - ultimate test of your skills!'
  }
];

const isRangeValid = computed(() => {
  return gameStore.minRange < gameStore.maxRange;
});

const canStartGame = computed(() => {
  return gameStore.playerName.trim() !== '' && 
         isRangeValid.value && 
         gameStore.difficulty !== null;
});

// Função para iniciar o fade-in de 10 segundos
const startFadeIn = () => {
  if (isFading.value) return;
  
  console.log('🚀 Iniciando fade-in de 10 segundos no Begin Journey...');
  isFading.value = true;
  
  // Reset da animação
  gsap.set(fadeOverlay.value, {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    display: 'block'
  });
  
  // Animação de fade-in de 10 segundos
  gsap.to(fadeOverlay.value, {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    duration: 10,
    ease: 'none',
    onStart: () => {
      console.log('✅ Fade-in iniciado');
    },
    onUpdate: function() {
      const progress = Math.round(this.progress() * 100);
      console.log(`📊 Progresso do fade-in: ${progress}%`);
    },
    onComplete: () => {
      console.log('🎉 Fade-in completo! Redirecionando para GameScreen...');
      isFading.value = false;
      // Após o fade-in completo, ir diretamente para a tela de jogo
      gameStore.setScreen('game');
      // Configurar o jogo
      gameStore.targetNumber = Math.floor(Math.random() * (gameStore.maxRange - gameStore.minRange + 1)) + gameStore.minRange;
      gameStore.attemptsUsed = 0;
      gameStore.gameWon = false;
      // O overlay global permanece ativado para cobrir a transição
      console.log('🎮 Jogo configurado - número alvo:', gameStore.targetNumber);
      console.log('🎯 Transição completa - agora na GameScreen');
    }
  });
};

// Função para lidar com o clique do botão
const handleBeginJourney = async () => {
  if (canStartGame.value && !isFading.value) {
    isFading.value = true;
    gameStore.showOverlay();
    await nextTick();
    gsap.set('.global-overlay', { opacity: 0 });
    gsap.to('.global-overlay', {
      opacity: 1,
      duration: 5,
      onComplete: () => {
        gameStore.setScreen('game');
        gameStore.targetNumber = Math.floor(Math.random() * (gameStore.maxRange - gameStore.minRange + 1)) + gameStore.minRange;
        gameStore.attemptsUsed = 0;
        gameStore.gameWon = false;
        isFading.value = false;
      }
    });
  }
};
</script>

<style scoped>
/* Overlay de fade-in */
.fade-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 9999;
  pointer-events: none;
  display: none;
}

/* Quando estiver fazendo fade, permitir interação */
.fade-overlay.animating {
  pointer-events: auto;
}
</style> 