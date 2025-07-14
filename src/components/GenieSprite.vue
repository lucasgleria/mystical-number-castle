<template>
  <div ref="genieRef" class="genie-sprite">
    <img :src="genieImageSrc" :alt="altText" class="genie-img" />
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { gsap } from 'gsap';

import welcomeGenie from '../assets/images/genie-sprites/welcome-genie.png';
import farGenie from '../assets/images/genie-sprites/far-from-right-guess-genie.png';
import closeGenie from '../assets/images/genie-sprites/close-from-right-guess-genie.png';
import endGenie from '../assets/images/genie-sprites/rightend-game-genie.png';

const props = defineProps({
  expression: {
    type: String,
    default: 'welcome',
    validator: v => [
      'welcome', 'far', 'close', 'end'
    ].includes(v)
  }
});

const genieRef = ref(null);

const genieImageSrc = computed(() => {
  switch (props.expression) {
    case 'welcome':
      return welcomeGenie;
    case 'far':
      return farGenie;
    case 'close':
      return closeGenie;
    case 'end':
      return endGenie;
    default:
      return welcomeGenie;
  }
});

const altText = computed(() => {
  switch (props.expression) {
    case 'welcome': return 'Gênio dando boas-vindas';
    case 'far': return 'Gênio indicando palpite distante';
    case 'close': return 'Gênio indicando palpite próximo';
    case 'end': return 'Gênio de fim de jogo';
    default: return 'Gênio';
  }
});

onMounted(() => {
  gsap.to(genieRef.value, {
    y: 18,
    duration: 2.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
});

watch(() => props.expression, (newVal, oldVal) => {
  if (genieRef.value) {
    gsap.fromTo(
      genieRef.value,
      { scale: 0.92, rotate: -4 },
      { scale: 1, rotate: 0, duration: 0.28, ease: 'back.out(2)' }
    );
  }
});
</script>

<style scoped>
.genie-sprite {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.genie-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
}
</style> 