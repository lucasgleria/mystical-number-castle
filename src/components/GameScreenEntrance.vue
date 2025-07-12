<template>
  <div class="game-entrance">
    <!-- Overlay de entrada que começa preto -->
    <div 
      ref="entranceOverlay" 
      class="entrance-overlay"
    ></div>
    
    <!-- Container do conteúdo -->
    <div ref="contentContainer" class="content-container">
      <slot></slot>
    </div>
    
    <!-- Texto de boas-vindas -->
    <div ref="welcomeText" class="welcome-text">
      <h2>Welcome to the Game!</h2>
      <p>Your challenge begins now...</p>
    </div>
    
    <!-- Debug info (temporário) -->
    <div class="debug-info" v-if="showDebug">
      <p>GameScreenEntrance Active</p>
              <p>isInGameEntrance: {{ gameStore.isInGameEntrance }}</p>
      <p>transitionPhase: {{ gameStore.transitionPhase }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { gsap } from 'gsap';
import { useGameStore } from '../stores/gameStore';

const gameStore = useGameStore();

const entranceOverlay = ref(null);
const contentContainer = ref(null);
const welcomeText = ref(null);
const showDebug = ref(true); // Temporário para debug

// Configurações da animação
const ENTRANCE_DURATION = 2.5; // 2.5 segundos total

// Iniciar animação de entrada
const startEntrance = () => {
  console.log('Starting game entrance animation...');
  
  if (!entranceOverlay.value || !contentContainer.value) {
    console.error('GameScreenEntrance: Elements not found');
    return;
  }

  console.log('GSAP version:', gsap.version);
  console.log('Elements found:', {
    overlay: !!entranceOverlay.value,
    content: !!contentContainer.value,
    text: !!welcomeText.value
  });

  // Timeline principal
  const tl = gsap.timeline({
    onComplete: () => {
      console.log('Game entrance animation completed');
      gameStore.completeGameEntrance();
    }
  });

  // Fase 1: Fade-out do overlay preto (2s)
  tl.to(entranceOverlay.value, {
    backgroundColor: "rgba(0, 0, 0, 0)",
    duration: 2,
    ease: "power2.inOut",
    onUpdate: () => {
      // Atualizar progresso
      const progress = 75 + (tl.progress() * 25); // 75-100% para entrada
      gameStore.updateTransitionProgress(progress);
      console.log('Fade-out progress:', progress.toFixed(1) + '%');
    }
  }, 0);

  // Fase 2: Animar o conteúdo aparecendo suavemente
  tl.fromTo(contentContainer.value, {
    opacity: 0,
    scale: 0.95,
    y: 20
  }, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 2,
    ease: "power2.out",
    onUpdate: () => {
      console.log('Content reveal progress:', (tl.progress() * 100).toFixed(1) + '%');
    }
  }, 0);

  // Fase 3: Texto de boas-vindas (1s)
  tl.fromTo(welcomeText.value, {
    opacity: 0,
    y: 30,
    scale: 0.9
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: "power2.out"
  }, 0.5);

  tl.to(welcomeText.value, {
    opacity: 0,
    y: -30,
    scale: 0.9,
    duration: 0.8,
    ease: "power2.in"
  }, 1.5);

  console.log('Game entrance timeline created');
};

// Observar mudanças no estado de entrada
    watch(() => gameStore.isInGameEntrance, (newValue, oldValue) => {
      console.log('GameScreenEntrance: isInGameEntrance changed:', oldValue, '→', newValue);
  console.log('GameScreenEntrance: transitionPhase:', gameStore.transitionPhase);
  
  if (newValue && gameStore.transitionPhase === 'game-entrance') {
    console.log('GameScreenEntrance: Starting game entrance animation...');
    // Pequeno delay para garantir que o DOM está pronto
    setTimeout(() => {
      startEntrance();
    }, 100);
  }
});

// Observar mudanças na fase de transição
watch(() => gameStore.transitionPhase, (newValue, oldValue) => {
  console.log('GameScreenEntrance: transitionPhase changed:', oldValue, '→', newValue);
});

onMounted(() => {
  console.log('GameScreenEntrance mounted');
  console.log('GSAP version:', gsap.version);
  
  // Configurar estado inicial - tela completamente preta
  if (entranceOverlay.value) {
    gsap.set(entranceOverlay.value, {
      backgroundColor: "rgba(0, 0, 0, 1)"
    });
    console.log('GameScreenEntrance: Overlay configured (black)');
  }
  
  if (contentContainer.value) {
    gsap.set(contentContainer.value, {
      opacity: 0,
      scale: 0.95,
      y: 20
    });
    console.log('GameScreenEntrance: Content container configured (hidden)');
  }
  
  if (welcomeText.value) {
    gsap.set(welcomeText.value, {
      opacity: 0,
      y: 30,
      scale: 0.9
    });
    console.log('GameScreenEntrance: Welcome text configured (hidden)');
  }
  
  // Teste de animação simples
  if (entranceOverlay.value) {
    gsap.to(entranceOverlay.value, {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(entranceOverlay.value, {
          backgroundColor: "rgba(0, 0, 0, 1)",
          duration: 0.5,
          ease: "power2.in"
        });
      }
    });
    console.log('GameScreenEntrance: Test animation started');
  }
});
</script>

<style scoped>
.game-entrance {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.entrance-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1);
  z-index: 10;
  pointer-events: none;
  will-change: background-color;
  transition: background-color 0.1s ease-out;
}

.content-container {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  will-change: opacity, transform;
}

.welcome-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 11;
  pointer-events: none;
  will-change: opacity, transform;
}

.welcome-text h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  letter-spacing: 2px;
}

.welcome-text p {
  font-size: 1.2rem;
  opacity: 0.9;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
  letter-spacing: 1px;
}

.debug-info {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  z-index: 12;
}

.debug-info p {
  margin: 0.2rem 0;
}

/* Responsividade */
@media (max-width: 768px) {
  .welcome-text h2 {
    font-size: 1.8rem;
  }
  
  .welcome-text p {
    font-size: 1rem;
  }
}
</style> 