<template>
  <transition name="overlay-fade">
    <div v-if="visible" class="global-overlay"></div>
  </transition>
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
  opacity: 1;
  z-index: 9999;
  pointer-events: all;
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}
.overlay-fade-enter-to,
.overlay-fade-leave-from {
  opacity: 1;
}
</style> 