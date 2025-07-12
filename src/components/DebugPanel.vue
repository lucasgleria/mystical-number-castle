<template>
  <div class="debug-panel" v-if="showDebug">
    <h3>Debug Panel</h3>
    <div class="debug-info">
      <p><strong>Current Screen:</strong> {{ gameStore.currentScreen }}</p>
      <p><strong>Transition Phase:</strong> {{ gameStore.transitionPhase }}</p>
      <p><strong>Animation Progress:</strong> {{ gameStore.animationProgress }}%</p>
      <p><strong>Is Transitioning:</strong> {{ gameStore.isTransitioning }}</p>
              <p><strong>Is In Game Entrance:</strong> {{ gameStore.isInGameEntrance }}</p>
    </div>
    <div class="debug-actions">
      <button @click="testStartGame">Test Start Game</button>
      <button @click="testCompleteCastleZoom">Test Complete Castle Zoom</button>
      <button @click="testCompleteFadeToBlack">Test Complete Fade to Black</button>
      <button @click="testCompleteGameEntrance">Test Complete Game Entrance</button>
      <button @click="resetStates">Reset States</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useGameStore } from '../stores/gameStore';

const gameStore = useGameStore();
const showDebug = ref(true); // Temporariamente true para debug

const testStartGame = () => {
  gameStore.startGame();
};

const testCompleteCastleZoom = () => {
  gameStore.completeCastleZoom();
};

const testCompleteFadeToBlack = () => {
  gameStore.completeFadeToBlack();
};

const testCompleteGameEntrance = () => {
  gameStore.completeGameEntrance();
};

const resetStates = () => {
  gameStore.currentScreen = 'meeting';
  gameStore.isTransitioning = false;
        gameStore.isGameEntering = false; // Mantendo o state, apenas removendo o getter conflitante
  gameStore.transitionPhase = 'idle';
  gameStore.animationProgress = 0;
};
</script>

<style scoped>
.debug-panel {
  position: fixed;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-family: monospace;
  font-size: 0.8rem;
  z-index: 10000;
  max-width: 300px;
}

.debug-info p {
  margin: 0.2rem 0;
}

.debug-actions {
  margin-top: 1rem;
}

.debug-actions button {
  display: block;
  width: 100%;
  margin: 0.2rem 0;
  padding: 0.3rem;
  background: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.debug-actions button:hover {
  background: #555;
}
</style> 