<template>
  <div v-if="visible" class="global-overlay"></div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
});
</script>

<style scoped>
.global-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  opacity: 0; /* Sempre começa transparente */
  z-index: 9999;
  pointer-events: all;
}
</style> 