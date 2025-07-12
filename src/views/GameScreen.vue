<template>
  <div class="game-screen">
    <!-- Overlay de fade-out -->
    <div class="fade-overlay" ref="fadeOverlay"></div>
    
    <div class="game-content">
      <h1>Game Screen</h1>
      <p>Your adventure begins here...</p>
      <div class="game-info">
        <p>Player: {{ gameStore.playerName }}</p>
        <p>Range: {{ gameStore.currentRangeDisplay }}</p>
        <p>Difficulty: {{ gameStore.difficulty }}</p>
        <p>Target Number: {{ gameStore.targetNumber }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useGameStore } from '../stores/gameStore';
import { gsap } from 'gsap';

const gameStore = useGameStore();
const fadeOverlay = ref(null);

// Função para iniciar o fade-out de 10 segundos
const startFadeOut = () => {
  console.log('🌅 Iniciando fade-out de 10 segundos na GameScreen...');
  
  // Configurar estado inicial (completamente preto)
  gsap.set(fadeOverlay.value, {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    display: 'block'
  });
  
  // Animação de fade-out de 10 segundos (preto para transparente)
  gsap.to(fadeOverlay.value, {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    duration: 10,
    ease: 'none',
    onStart: () => {
      console.log('✅ Fade-out iniciado');
    },
    onUpdate: function() {
      const progress = Math.round(this.progress() * 100);
      console.log(`📊 Progresso do fade-out: ${progress}%`);
    },
    onComplete: () => {
      console.log('🎉 Fade-out completo! GameScreen totalmente visível');
      // Esconder o overlay após a animação
      gsap.set(fadeOverlay.value, {
        display: 'none'
      });
    }
  });
};

onMounted(() => {
  console.log('🎮 GameScreen montado');
  console.log('🎯 Elemento fadeOverlay:', fadeOverlay.value);
  
  // Iniciar fade-out automaticamente quando o componente for montado
  setTimeout(() => {
    startFadeOut();
  }, 100); // Pequeno delay para garantir que o DOM está pronto
});
</script>

<style scoped>
.game-screen {
  min-height: 100vh;
  background: linear-gradient(135deg, #0A0A23 0%, #3C3C88 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
}

/* Overlay de fade-out */
.fade-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1);
  z-index: 9999;
  pointer-events: none;
  display: none;
}

.game-content {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.game-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
}

.game-content p {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  opacity: 0.9;
}

.game-info {
  margin-top: 2rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.game-info p {
  margin: 0.5rem 0;
  font-size: 1rem;
  opacity: 0.8;
}
</style> 