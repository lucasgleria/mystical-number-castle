<template>
  <div v-if="gameStore.isTransitioning" class="castle-transition">
    
    <!-- Overlay de transição que escurece gradualmente -->
    <div 
      ref="transitionOverlay" 
      class="transition-overlay"
    ></div>
    
    <!-- Container da animação do castelo -->
    <div ref="castleContainer" class="castle-container">
      <img 
        ref="castleImage" 
        src="/src/assets/images/castle.png" 
        alt="Castle Entrance" 
        class="castle-image"
        @load="onImageLoad"
        @error="onImageError"
      />
      <!-- Fallback se a imagem não carregar -->
      <div v-if="imageError" class="castle-fallback" style="background: linear-gradient(45deg, #3C3C88, #4A4A9A); width: 300px; height: 200px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; border-radius: 10px;">
        🏰 CASTLE
      </div>
    </div>
    
    <!-- Texto de transição -->
    <div ref="transitionText" class="transition-text">
      <h2>Entering the Mystical Castle...</h2>
      <p>The Genie awaits your challenge...</p>
    </div>
    
    <!-- Debug info (temporário) -->
    <div class="debug-info" v-if="showDebug">
      <p>CastleTransition Active</p>
      <p>isTransitioning: {{ gameStore.isTransitioning }}</p>
      <p>transitionPhase: {{ gameStore.transitionPhase }}</p>
      <p>progress: {{ gameStore.animationProgress }}%</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { gsap } from 'gsap';
import { useGameStore } from '../stores/gameStore';

const gameStore = useGameStore();

const transitionOverlay = ref(null);
const castleContainer = ref(null);
const castleImage = ref(null);
const transitionText = ref(null);
const showDebug = ref(true); // Temporário para debug
const imageError = ref(false);

// Funções para debug da imagem
const onImageLoad = () => {
  console.log('✅ Castle image loaded successfully');
  imageError.value = false;
};

const onImageError = (error) => {
  console.error('❌ Castle image failed to load:', error);
  imageError.value = true;
};

// Configurações da animação
const ZOOM_DURATION = 2; // 2 segundos para zoom
const FADE_DURATION = 2.5; // 2.5 segundos para fade

// Iniciar animação de transição
const startTransition = () => {
  console.log('🏰 Starting castle transition...');
  console.log('🎬 Animation settings:');
  console.log('   - Zoom duration: 3s');
  console.log('   - Zoom scale: 4.0x');
  console.log('   - Movement: y: -20px, rotation: 2°');
  console.log('   - Fade duration: 2.5s');
  console.log('🎯 Elements check in startTransition:');
  console.log('   - castleContainer:', castleContainer.value);
  console.log('   - transitionOverlay:', transitionOverlay.value);
  console.log('   - castleImage:', castleImage.value);
  
  if (!castleContainer.value || !transitionOverlay.value) {
    console.error('❌ Elements not found');
    return;
  }

  // Timeline principal
  const tl = gsap.timeline({
    onComplete: () => {
      console.log('Castle transition completed');
      gameStore.completeFadeToBlack();
    },
    onStart: () => {
      console.log('Castle transition timeline started');
    }
  });

  // Fase 1: Zoom dramático no castelo (3s)
  tl.to(castleContainer.value, {
    scale: 4.0, // Zoom mais dramático
    y: -20, // Movimento sutil para cima
    rotation: 2, // Rotação sutil para efeito cinematográfico
    duration: ZOOM_DURATION + 1, // 3 segundos
    ease: "power3.out", // Easing mais dramático
    onUpdate: () => {
      // Atualizar progresso
      const progress = (tl.progress() * 60); // 0-60% para zoom
      gameStore.updateTransitionProgress(progress);
      console.log('🎯 Zoom progress:', progress.toFixed(1) + '%');
    }
  }, 0);

  // Efeito de brilho dramático no castelo durante o zoom
  tl.to(castleImage.value, {
    filter: "brightness(1.5) contrast(1.3) saturate(1.2) blur(0px)",
    duration: (ZOOM_DURATION + 1) * 0.6,
    ease: "power2.out"
  }, 0);

  tl.to(castleImage.value, {
    filter: "brightness(1.2) contrast(1.2) saturate(1.1) blur(1px)",
    duration: (ZOOM_DURATION + 1) * 0.4,
    ease: "power2.in"
  }, (ZOOM_DURATION + 1) * 0.6);

  // Fase 2: Fade-in escurecendo gradualmente (2.5s)
  tl.to(transitionOverlay.value, {
    backgroundColor: "rgba(0, 0, 0, 1)",
    duration: FADE_DURATION,
    ease: "power2.inOut",
    onUpdate: () => {
      // Atualizar progresso
      const progress = 60 + (tl.progress() * 40); // 60-100% para fade
      gameStore.updateTransitionProgress(progress);
      console.log('🌙 Fade progress:', progress.toFixed(1) + '%');
    }
  }, 0);

  // Animar o texto de transição
  tl.fromTo(transitionText.value, {
    opacity: 0,
    y: 50,
    scale: 0.9,
    textShadow: "0 0 0px rgba(255, 255, 255, 0)"
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    textShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
    duration: 1,
    ease: "power2.out"
  }, 1);

  tl.to(transitionText.value, {
    opacity: 0,
    y: -50,
    scale: 0.9,
    textShadow: "0 0 0px rgba(255, 255, 255, 0)",
    duration: 1,
    ease: "power2.in"
  }, 2);
};

// Observar mudanças no estado de transição
watch(() => gameStore.isTransitioning, (newValue, oldValue) => {
  console.log('🏰 CastleTransition: isTransitioning changed:', oldValue, '→', newValue);
  console.log('🏰 CastleTransition: transitionPhase:', gameStore.transitionPhase);
  console.log('🏰 CastleTransition: currentScreen:', gameStore.currentScreen);
  
  if (newValue && gameStore.transitionPhase === 'castle-zoom') {
    console.log('🏰 CastleTransition: Starting castle transition...');
    // Pequeno delay para garantir que o DOM está pronto
    setTimeout(() => {
      startTransition();
    }, 100);
  }
});

// Observar mudanças na fase de transição
watch(() => gameStore.transitionPhase, (newValue, oldValue) => {
  console.log('transitionPhase changed:', oldValue, '→', newValue);
});

onMounted(() => {
  console.log('🏰 CastleTransition mounted');
  console.log('🎯 Elements check:');
  console.log('   - transitionOverlay:', transitionOverlay.value);
  console.log('   - castleContainer:', castleContainer.value);
  console.log('   - castleImage:', castleImage.value);
  console.log('   - transitionText:', transitionText.value);
  
  // Teste simples do GSAP
  console.log('🎬 GSAP version:', gsap.version);
  
  // Configurar estado inicial
  if (transitionOverlay.value) {
    gsap.set(transitionOverlay.value, {
      backgroundColor: "rgba(0, 0, 0, 0)"
    });
    console.log('Overlay configured');
  }
  
  if (castleContainer.value) {
    gsap.set(castleContainer.value, {
      scale: 1,
      y: 0,
      rotation: 0
    });
    console.log('🏰 Castle container configured (scale: 1, y: 0, rotation: 0)');
  }
  
  if (transitionText.value) {
    gsap.set(transitionText.value, {
      opacity: 0,
      y: 50
    });
    console.log('Text configured');
  }
  
  // Teste de animação simples
  if (castleContainer.value) {
    gsap.to(castleContainer.value, {
      scale: 1.1,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(castleContainer.value, {
          scale: 1,
          duration: 0.5,
          ease: "power2.in"
        });
      }
    });
    console.log('GSAP test animation started');
  }
});
</script>

<style scoped>
.castle-transition {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  pointer-events: none;
  overflow: hidden;
}

.transition-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 2;
  will-change: background-color;
  transition: background-color 0.1s ease-out;
}

.castle-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center center;
  will-change: transform;
}

.castle-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: brightness(1.1) contrast(1.1);
  will-change: transform;
  transition: transform 0.1s ease-out;
}

.transition-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 4;
  pointer-events: none;
}

.transition-text h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  letter-spacing: 2px;
}

.transition-text p {
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
  .transition-text h2 {
    font-size: 1.8rem;
  }
  
  .transition-text p {
    font-size: 1rem;
  }
  
  .castle-container {
    transform: translate(-50%, -50%) scale(0.9);
  }
  
  .castle-image {
    max-width: 90%;
    max-height: 90%;
  }
}

@media (max-width: 480px) {
  .transition-text h2 {
    font-size: 1.5rem;
  }
  
  .transition-text p {
    font-size: 0.9rem;
  }
  
  .castle-container {
    transform: translate(-50%, -50%) scale(0.8);
  }
}
</style> 