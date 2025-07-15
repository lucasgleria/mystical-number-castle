<template>
  <button
    @click="handleClick"
    class="difficulty-button"
    :class="{ 'selected': isSelected }"
  >
    {{ label }}
  </button>
</template>

<script setup>
const props = defineProps({
  label: String,
  value: String,
  isSelected: Boolean
});

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click', props.value);
};
</script>

<style scoped>
.difficulty-button {
  padding: 0.75rem 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(60, 60, 136, 0.2);
  color: #FFFFFF;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  backdrop-filter: blur(10px);
  min-height: 44px;
  min-width: 44px;
  position: relative;
  overflow: hidden;
}

.difficulty-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

.difficulty-button:hover::before {
  left: 100%;
}

.difficulty-button:hover {
  background: rgba(60, 60, 136, 0.4);
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
}

.difficulty-button.selected {
  background: linear-gradient(135deg, #FFFFFF 0%, #F0F0F0 100%);
  color: #3C3C88;
  border-color: #FFFFFF;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.4);
  font-weight: 700;
}

.difficulty-button.selected:hover {
  background: linear-gradient(135deg, #F0F0F0 0%, #FFFFFF 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 25px rgba(255, 255, 255, 0.5);
}

.difficulty-button:active {
  transform: translateY(0) scale(0.98);
  transition: transform 0.1s ease;
}

/* Responsividade para mobile */
@media (max-width: 768px) {
  .difficulty-button {
    padding: 1rem 1.5rem;
    font-size: 0.9rem;
    min-height: 48px;
    min-width: 48px;
    border-radius: 12px;
    letter-spacing: 0.5px;
  }
  
  .difficulty-button:hover {
    transform: translateY(-1px);
  }
  
  .difficulty-button.selected:hover {
    transform: translateY(-1px);
  }
}

@media (max-width: 480px) {
  .difficulty-button {
    padding: 0.8rem 1.2rem;
    font-size: 0.85rem;
    min-height: 48px;
    min-width: 48px;
  }
}

/* Melhorias para touch */
@media (max-width: 768px) {
  .difficulty-button {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  
  .difficulty-button:active {
    transform: scale(0.95);
    transition: transform 0.1s ease;
  }
}

/* Previne zoom em dispositivos touch */
@media (max-width: 768px) {
  .difficulty-button {
    font-size: 16px;
  }
}
</style> 