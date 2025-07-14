<template>
  <div class="atmospheric-effects">
    <!-- Névoa sutil -->
    <div class="fog-layer fog-layer-1"></div>
    <div class="fog-layer fog-layer-2"></div>
    <div class="fog-layer fog-layer-3"></div>
    
    <!-- Estrelas distantes -->
    <div class="distant-stars">
      <div 
        v-for="star in stars" 
        :key="star.id"
        :style="getStarStyle(star)"
        class="star"
        :class="{ 'twinkling': star.isTwinkling }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const stars = ref([]);
const animationFrame = ref(null);

// Configurações das estrelas
const STAR_COUNT = 30;

class Star {
  constructor(id) {
    this.id = id;
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * (window.innerHeight * 0.6); // Apenas na parte superior
    this.size = Math.random() * 1.5 + 0.5; // 0.5-2px
    this.opacity = Math.random() * 0.6 + 0.2; // 0.2-0.8
    this.twinkleSpeed = Math.random() * 0.02 + 0.01; // Velocidade do piscar
    this.twinklePhase = Math.random() * Math.PI * 2; // Fase inicial
    this.isTwinkling = false;
  }

  update() {
    this.twinklePhase += this.twinkleSpeed;
    
    // Piscar baseado na fase
    const twinkleIntensity = (Math.sin(this.twinklePhase) + 1) / 2;
    this.opacity = (Math.random() * 0.4 + 0.2) * (0.5 + twinkleIntensity * 0.5);
    
    // Ocasionalmente fazer uma estrela piscar mais intensamente
    if (Math.random() < 0.001) {
      this.isTwinkling = true;
      setTimeout(() => {
        this.isTwinkling = false;
      }, 200);
    }
  }
}

// Inicializar estrelas
const initStars = () => {
  stars.value = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.value.push(new Star(i));
  }
};

// Obter estilo CSS para cada estrela
const getStarStyle = (star) => {
  return {
    left: `${star.x}px`,
    top: `${star.y}px`,
    width: `${star.size}px`,
    height: `${star.size}px`,
    opacity: star.opacity
  };
};

// Loop de animação
const animate = () => {
  stars.value.forEach(star => {
    star.update();
  });

  animationFrame.value = requestAnimationFrame(animate);
};

// Redimensionar estrelas quando a janela mudar de tamanho
const handleResize = () => {
  stars.value.forEach(star => {
    if (star.x > window.innerWidth) {
      star.x = window.innerWidth - 10;
    }
    if (star.y > window.innerHeight * 0.6) {
      star.y = window.innerHeight * 0.6 - 10;
    }
  });
};

onMounted(() => {
  initStars();
  animate();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value);
  }
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.atmospheric-effects {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

/* Camadas de névoa */
.fog-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.02) 0%,
    rgba(255, 255, 255, 0.01) 50%,
    transparent 100%
  );
  animation: fog-drift 20s linear infinite;
}

.fog-layer-1 {
  animation-delay: 0s;
  opacity: 0.3;
}

.fog-layer-2 {
  animation-delay: -7s;
  opacity: 0.2;
  animation-duration: 25s;
}

.fog-layer-3 {
  animation-delay: -14s;
  opacity: 0.15;
  animation-duration: 30s;
}

@keyframes fog-drift {
  0% {
    transform: translateX(-10%) translateY(-5%);
  }
  50% {
    transform: translateX(5%) translateY(10%);
  }
  100% {
    transform: translateX(-10%) translateY(-5%);
  }
}

/* Estrelas distantes */
.distant-stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60%;
}

.star {
  position: absolute;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    transparent 100%
  );
  border-radius: 50%;
  transition: all 0.3s ease;
}

.star.twinkling {
  animation: twinkle 0.2s ease-in-out;
  transform: scale(1.5);
  filter: brightness(1.5);
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .fog-layer {
    opacity: 0.5;
  }
  
  .star {
    transform: scale(0.8);
  }
}
</style> 