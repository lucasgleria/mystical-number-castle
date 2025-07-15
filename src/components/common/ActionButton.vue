<template>
  <button
    :disabled="disabled"
    @click="handleClick"
    class="action-button"
    :class="{ 'disabled': disabled }"
  >
    {{ label }}
  </button>
</template>

<script setup>
const props = defineProps({
  label: String,
  disabled: Boolean
});

const emit = defineEmits(['click']);

const handleClick = () => {
  if (!props.disabled) {
    emit('click');
  }
};
</script>

<style scoped>
.action-button {
  padding: 0.75rem 2rem;
  border: 2px solid #3C3C88;
  border-radius: 8px;
  background: linear-gradient(135deg, #3C3C88 0%, #4A4A9A 100%);
  color: #FFFFFF;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(60, 60, 136, 0.3);
  min-height: 44px;
  min-width: 44px;
  position: relative;
  overflow: hidden;
}

.action-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.action-button:hover:not(.disabled)::before {
  left: 100%;
}

.action-button:hover:not(.disabled) {
  background: linear-gradient(135deg, #4A4A9A 0%, #3C3C88 100%);
  border-color: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.4);
}

.action-button:active:not(.disabled) {
  transform: translateY(0) scale(0.98);
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
}

.action-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: linear-gradient(135deg, #666 0%, #999 100%);
  border-color: #666;
  box-shadow: none;
}

.action-button.disabled:hover {
  transform: none;
  box-shadow: none;
}

/* Responsividade para mobile */
@media (max-width: 768px) {
  .action-button {
    padding: 1rem 2rem;
    font-size: 1rem;
    min-height: 48px;
    min-width: 48px;
    border-radius: 12px;
    letter-spacing: 0.5px;
  }
  
  .action-button:hover:not(.disabled) {
    transform: translateY(-1px);
  }
}

@media (max-width: 480px) {
  .action-button {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
    min-height: 48px;
    min-width: 48px;
  }
}

/* Melhorias para touch */
@media (max-width: 768px) {
  .action-button {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  
  .action-button:active:not(.disabled) {
    transform: scale(0.95);
    transition: transform 0.1s ease;
  }
}

/* Previne zoom em dispositivos touch */
@media (max-width: 768px) {
  .action-button {
    font-size: 16px;
  }
}
</style> 