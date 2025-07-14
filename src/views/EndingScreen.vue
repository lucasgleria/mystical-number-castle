<template>
  <div class="ending-screen-bg">
    <div class="fade-overlay" ref="fadeOverlay"></div>
    <h1>Fim de Jogo</h1>
    <p>Esta é a tela de encerramento (stub).</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

const fadeOverlay = ref(null);

onMounted(() => {
  // Overlay começa opaco
  gsap.set(fadeOverlay.value, {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    display: 'block'
  });
  // Fade-in para revelar a tela
  gsap.to(fadeOverlay.value, {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    duration: 5,
    ease: 'power2.inOut',
    onComplete: () => {
      // Overlay some após fade-in
      gsap.set(fadeOverlay.value, { display: 'none' });
    }
  });
});
</script>

<style scoped>
.ending-screen-bg {
  min-height: 100vh;
  min-width: 100vw;
  background: #222;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  position: relative;
}
.fade-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,1);
  z-index: 9999;
  pointer-events: none;
  display: none;
  transition: background-color 0.2s;
}
</style> 