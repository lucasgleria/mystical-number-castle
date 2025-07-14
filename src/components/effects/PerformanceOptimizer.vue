<template>
  <div class="performance-optimizer" style="display: none;">
    <!-- Componente invisível para detectar performance -->
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue';

const performanceLevel = ref('high'); // 'low', 'medium', 'high'
const frameRate = ref(60);
const lastFrameTime = ref(0);

// Detectar performance do dispositivo
const detectPerformance = () => {
  const startTime = performance.now();
  let frameCount = 0;
  
  const measureFrameRate = (currentTime) => {
    frameCount++;
    
    if (currentTime - startTime >= 1000) { // Medir por 1 segundo
      const fps = frameCount;
      
      if (fps < 30) {
        performanceLevel.value = 'low';
      } else if (fps < 50) {
        performanceLevel.value = 'medium';
      } else {
        performanceLevel.value = 'high';
      }
      
      frameRate.value = fps;
      return;
    }
    
    requestAnimationFrame(measureFrameRate);
  };
  
  requestAnimationFrame(measureFrameRate);
};

// Configurações baseadas na performance
const getPerformanceConfig = () => {
  switch (performanceLevel.value) {
    case 'low':
      return {
        particleCount: 30,
        starCount: 15,
        fogLayers: 1,
        glowDuration: 2000,
        animationSpeed: 0.5
      };
    case 'medium':
      return {
        particleCount: 50,
        starCount: 20,
        fogLayers: 2,
        glowDuration: 2500,
        animationSpeed: 0.75
      };
    case 'high':
    default:
      return {
        particleCount: 80,
        starCount: 30,
        fogLayers: 3,
        glowDuration: 3000,
        animationSpeed: 1
      };
  }
};

// Detectar se é dispositivo móvel
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth <= 768;
};

onMounted(() => {
  // Detectar performance inicial
  detectPerformance();
  
  // Se for dispositivo móvel, reduzir automaticamente
  if (isMobile()) {
    performanceLevel.value = 'medium';
  }
  
  // Re-detectar performance após 5 segundos
  setTimeout(() => {
    detectPerformance();
  }, 5000);
});

// Fornecer configurações para outros componentes
provide('performanceConfig', getPerformanceConfig);
provide('performanceLevel', performanceLevel);
provide('isMobile', isMobile);
</script>

<style scoped>
.performance-optimizer {
  position: absolute;
  top: -9999px;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
</style> 