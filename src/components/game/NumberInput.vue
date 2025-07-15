<template>
  <div class="number-input-container">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input
      type="number"
      :placeholder="placeholder"
      :value="modelValue"
      :min="min"
      :max="max"
      @input="handleInput"
      class="number-input"
    />
  </div>
</template>

<script setup>
defineProps({
  label: String,
  placeholder: String,
  modelValue: Number,
  min: Number,
  max: Number
});

const emit = defineEmits(['update:modelValue']);

const handleInput = (event) => {
  const value = parseInt(event.target.value);
  if (!isNaN(value)) {
    emit('update:modelValue', value);
  }
};
</script>

<style scoped>
.number-input-container {
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

.number-input {
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

.number-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.number-input:focus {
  outline: none;
  border-color: #FFFFFF;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  background: rgba(60, 60, 136, 0.3);
}

/* Remove setas do input number */
.number-input::-webkit-outer-spin-button,
.number-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.number-input[type=number] {
  -moz-appearance: textfield;
}

/* Responsividade para mobile */
@media (max-width: 768px) {
  .input-label {
    font-size: 0.9rem;
  }
  
  .number-input {
    padding: 1rem 1.2rem;
    font-size: 16px;
    min-height: 48px;
    border-radius: 12px;
  }
}

@media (max-width: 480px) {
  .number-input {
    padding: 0.8rem 1rem;
    font-size: 16px;
    min-height: 48px;
  }
  
  .input-label {
    font-size: 0.85rem;
  }
}

/* Melhorias para touch */
@media (max-width: 768px) {
  .number-input {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  
  .number-input:focus {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
  }
}

/* Previne zoom em dispositivos touch */
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .number-input {
    font-size: 16px;
  }
}
</style> 