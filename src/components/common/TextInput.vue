<template>
  <div class="text-input-container">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      :maxlength="maxLength"
      @input="handleInput"
      class="text-input"
    />
    <div v-if="maxLength" class="character-counter">
      {{ modelValue.length }}/{{ maxLength }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  placeholder: String,
  modelValue: String,
  maxLength: Number
});

const emit = defineEmits(['update:modelValue']);

const handleInput = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<style scoped>
.text-input-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.input-label {
  font-size: 1rem;
  font-weight: 600;
  color: #FFFFFF;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.text-input {
  padding: 0.75rem 1rem;
  border: 2px solid rgba(60, 60, 136, 0.5);
  border-radius: 8px;
  background: rgba(60, 60, 136, 0.2);
  backdrop-filter: blur(10px);
  color: #FFFFFF;
  font-size: 1rem;
  transition: all 0.3s ease;
  min-height: 44px;
  width: 100%;
  box-sizing: border-box;
}

.text-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.text-input:focus {
  outline: none;
  border-color: #FFFFFF;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  background: rgba(60, 60, 136, 0.3);
}

.character-counter {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: right;
}

/* Responsividade para mobile */
@media (max-width: 768px) {
  .input-label {
    font-size: 0.9rem;
  }
  
  .text-input {
    padding: 1rem 1.2rem;
    font-size: 16px;
    min-height: 48px;
    border-radius: 12px;
  }
  
  .character-counter {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .text-input {
    padding: 0.8rem 1rem;
    font-size: 16px;
    min-height: 48px;
  }
  
  .input-label {
    font-size: 0.85rem;
  }
  
  .character-counter {
    font-size: 0.7rem;
  }
}

/* Melhorias para touch */
@media (max-width: 768px) {
  .text-input {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  
  .text-input:focus {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
  }
}

/* Previne zoom em dispositivos touch */
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .text-input {
    font-size: 16px;
  }
}
</style> 