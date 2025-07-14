<template>
  <div ref="genieRef" class="genie-sprite" :class="expression">
    <!-- O sprite é exibido via background-position -->
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { gsap } from 'gsap';

const props = defineProps({
  expression: {
    type: String,
    default: 'idle',
    validator: v => [
      'idle', 'thinking', 'correct', 'tooHigh', 'tooLow', 'close', 'sad'
    ].includes(v)
  }
});

const genieRef = ref(null);
let floatTween = null;

onMounted(() => {
  // Animação de flutuação contínua
  floatTween = gsap.to(genieRef.value, {
    y: 18,
    duration: 2.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
});

watch(() => props.expression, (newVal, oldVal) => {
  // Efeito "pop" ao trocar de expressão
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
  background-image: url('@/assets/images/genie-sprites.png');
  background-repeat: no-repeat;
  background-size: 720px 120px; /* Exemplo: 6 estados lado a lado, ajuste se necessário */
  transition: background-position 0.2s;
}
/* Mapear expressões para posições do sprite (ajuste conforme layout real do sprite sheet) */
.genie-sprite.idle      { background-position:   0   0; }
.genie-sprite.thinking  { background-position: -120px 0; }
.genie-sprite.correct   { background-position: -240px 0; }
.genie-sprite.tooHigh   { background-position: -360px 0; }
.genie-sprite.tooLow    { background-position: -480px 0; }
.genie-sprite.close     { background-position: -600px 0; }
.genie-sprite.sad       { background-position: -600px 0; /* Reutiliza último se não houver */ }
</style> 