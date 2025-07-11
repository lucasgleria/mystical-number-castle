
<template>
  <div id="app">
    <!-- Otimizador de performance -->
    <PerformanceOptimizer />
    
    <!-- Efeitos atmosféricos (névoa e estrelas) -->
    <AtmosphericEffects />
    
    <!-- Sistema de partículas (vagalumes) -->
    <ParticleSystem />
    
    <MeetingScreen v-if="gameStore.currentScreen === 'meeting'" />
    <!-- GameScreen será adicionado na Fase 3 -->
    <!-- EndingScreen será adicionado na Fase 4 -->
  </div>
</template>

<script setup>
import { useGameStore } from './stores/gameStore';
import MeetingScreen from './views/MeetingScreen.vue';
import ParticleSystem from './components/ParticleSystem.vue';
import AtmosphericEffects from './components/AtmosphericEffects.vue';
import PerformanceOptimizer from './components/PerformanceOptimizer.vue';

const gameStore = useGameStore();
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 100vh;
  overflow: hidden;
}
</style>

