<template>
  <div class="particle-system">
    <canvas ref="canvas" class="particle-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref(null);
const ctx = ref(null);
const animationFrame = ref(null);
const particles = ref([]);

// Configurações das partículas
const PARTICLE_COUNT = 80;
const GLOW_DURATION = 3000; // 3 segundos
const FADE_DURATION = 1500; // 1.5 segundos

// Classe para representar uma partícula
class Firefly {
  constructor(id) {
    this.id = id;
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.size = Math.random() * 2 + 0.5; // 0.5-2.5px
    this.opacity = Math.random() * 0.6 + 0.4; // 0.4-1.0
    this.speedX = (Math.random() - 0.5) * 0.3; // Movimento horizontal mais suave
    this.speedY = (Math.random() - 0.5) * 0.3; // Movimento vertical mais suave
    this.isGlowing = false;
    this.glowStartTime = 0;
    this.lastGlowTime = 0;
    this.glowInterval = Math.random() * 4000 + 3000; // 3-7 segundos entre glows
    this.glowIntensity = 0;
    this.targetGlowIntensity = 0;
  }

  update(deltaTime) {
    // Movimento suave
    this.x += this.speedX;
    this.y += this.speedY;

    // Manter partículas dentro da tela com borda
    const margin = 20;
    if (this.x < margin || this.x > window.innerWidth - margin) {
      this.speedX *= -1;
      this.x = Math.max(margin, Math.min(window.innerWidth - margin, this.x));
    }
    if (this.y < margin || this.y > window.innerHeight - margin) {
      this.speedY *= -1;
      this.y = Math.max(margin, Math.min(window.innerHeight - margin, this.y));
    }

    // Sistema de brilho com transição suave
    const currentTime = Date.now();
    
    if (!this.isGlowing && currentTime - this.lastGlowTime > this.glowInterval) {
      this.isGlowing = true;
      this.glowStartTime = currentTime;
      this.lastGlowTime = currentTime;
      this.targetGlowIntensity = 1;
    }

    if (this.isGlowing && currentTime - this.glowStartTime > GLOW_DURATION) {
      this.isGlowing = false;
      this.targetGlowIntensity = 0;
    }

    // Transição suave da intensidade do brilho
    if (this.glowIntensity < this.targetGlowIntensity) {
      this.glowIntensity += 0.05;
    } else if (this.glowIntensity > this.targetGlowIntensity) {
      this.glowIntensity -= 0.05;
    }
  }

  draw(ctx) {
    const glowRadius = this.size * (1 + this.glowIntensity * 2);
    const glowOpacity = this.opacity * (0.3 + this.glowIntensity * 0.7);

    // Desenhar o brilho externo
    if (this.glowIntensity > 0) {
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, glowRadius
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${glowOpacity * 0.8})`);
      gradient.addColorStop(0.5, `rgba(255, 255, 255, ${glowOpacity * 0.4})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Desenhar a partícula central
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity + this.glowIntensity * 0.5})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Inicializar canvas
const initCanvas = () => {
  const canvasElement = canvas.value;
  ctx.value = canvasElement.getContext('2d');
  
  // Configurar canvas para alta resolução
  const dpr = window.devicePixelRatio || 1;
  const rect = canvasElement.getBoundingClientRect();
  
  canvasElement.width = rect.width * dpr;
  canvasElement.height = rect.height * dpr;
  ctx.value.scale(dpr, dpr);
  
  canvasElement.style.width = rect.width + 'px';
  canvasElement.style.height = rect.height + 'px';
};

// Inicializar partículas
const initParticles = () => {
  particles.value = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.value.push(new Firefly(i));
  }
};

// Loop de animação
const animate = () => {
  // Limpar canvas
  ctx.value.clearRect(0, 0, window.innerWidth, window.innerHeight);
  
  // Atualizar e desenhar partículas
  particles.value.forEach(particle => {
    particle.update();
    particle.draw(ctx.value);
  });

  animationFrame.value = requestAnimationFrame(animate);
};

// Redimensionar canvas quando a janela mudar de tamanho
const handleResize = () => {
  const canvasElement = canvas.value;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvasElement.getBoundingClientRect();
  
  canvasElement.width = rect.width * dpr;
  canvasElement.height = rect.height * dpr;
  ctx.value.scale(dpr, dpr);
  
  canvasElement.style.width = rect.width + 'px';
  canvasElement.style.height = rect.height + 'px';
  
  // Ajustar partículas para o novo tamanho
  particles.value.forEach(particle => {
    if (particle.x > window.innerWidth) {
      particle.x = window.innerWidth - 20;
    }
    if (particle.y > window.innerHeight) {
      particle.y = window.innerHeight - 20;
    }
  });
};

onMounted(() => {
  initCanvas();
  initParticles();
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
.particle-system {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.particle-canvas {
  display: block;
  width: 100%;
  height: 100%;
}

/* Responsividade */
@media (max-width: 768px) {
  /* Reduzir número de partículas em dispositivos móveis */
  .particle-system {
    opacity: 0.8;
  }
}
</style> 