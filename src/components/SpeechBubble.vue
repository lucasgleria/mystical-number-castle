<template>
  <transition @enter="onEnter" @leave="onLeave">
    <div v-if="message" ref="bubbleRef" class="speech-bubble">
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue';
import { gsap } from 'gsap';

const props = defineProps({
  message: {
    type: String,
    default: ''
  }
});

const bubbleRef = ref(null);

function onEnter(el, done) {
  gsap.fromTo(el, { opacity: 0, scale: 0.85 }, {
    opacity: 1,
    scale: 1,
    duration: 0.35,
    ease: 'back.out(1.7)',
    onComplete: done
  });
}
function onLeave(el, done) {
  gsap.to(el, {
    opacity: 0,
    scale: 0.85,
    duration: 0.22,
    ease: 'back.in(1.2)',
    onComplete: done
  });
}

// Animação ao trocar de mensagem
watch(() => props.message, (newVal, oldVal) => {
  if (bubbleRef.value && newVal && oldVal) {
    gsap.fromTo(bubbleRef.value, { scale: 0.95 }, { scale: 1, duration: 0.22, ease: 'back.out(2)' });
  }
});
</script>

<style scoped>
.speech-bubble {
  min-height: 48px;
  max-width: 90vw;
  padding: 16px 24px;
  background: rgba(255,255,255,0.85);
  border-radius: 18px 18px 18px 8px;
  color: #4b2e83;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  position: relative;
  margin-bottom: 8px;
  word-break: break-word;
  text-align: center;
}
.speech-bubble::after {
  content: '';
  position: absolute;
  left: 32px;
  bottom: -18px;
  width: 28px;
  height: 28px;
  background: rgba(255,255,255,0.85);
  border-radius: 0 0 18px 18px;
  transform: rotate(25deg);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  z-index: 1;
}
</style> 