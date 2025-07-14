<template>
  <div class="simple-fade-in">
    <div class="fade-overlay" ref="fadeOverlay"></div>
    <div class="content">
      <h2>Teste de Fade-In</h2>
      <p>Esta é uma animação simples de fade-in de 10 segundos</p>
      <button @click="startFadeIn" :disabled="isAnimating">
        {{ isAnimating ? 'Animando...' : 'Iniciar Fade-In' }}
      </button>
    </div>
  </div>
</template>

<script>
// import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

export default {
  name: 'SimpleFadeIn',
  setup() {
    const fadeOverlay = ref(null)
    const isAnimating = ref(false)

    const startFadeIn = () => {
      if (isAnimating.value) return
      
      isAnimating.value = true
      
      // Reset da animação
      gsap.set(fadeOverlay.value, {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        display: 'block'
      })
      
      // Animação de fade-in de 10 segundos
      gsap.to(fadeOverlay.value, {
        backgroundColor: 'rgba(0, 0, 0, 1)',
        duration: 10,
        ease: 'none',
        onComplete: () => {
          isAnimating.value = false
        }
      })
    }
    return {
      fadeOverlay,
      isAnimating,
      startFadeIn
    }
  }
}
</script>

<style scoped>
.simple-fade-in {
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.fade-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 10;
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 5;
  text-align: center;
  color: white;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
}

.content h2 {
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: bold;
}

.content p {
  margin-bottom: 2rem;
  font-size: 1.2rem;
  opacity: 0.9;
}

.content button {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}

.content button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.content button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style> 