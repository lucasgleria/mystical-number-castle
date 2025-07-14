<template>
  <div class="number-input-container">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input
      type="number"
      :placeholder="placeholder"
      :value="modelValue"
      :min="min"
      :max="max"
      @input="onInput"
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

function onInput(event) {
  let value = event.target.value;
  if (value === '' || value === null) {
    emit('update:modelValue', null);
    return;
  }
  value = Number(value);
  emit('update:modelValue', value);
}
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

/* Remove arrows from number input */
.number-input::-webkit-outer-spin-button,
.number-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.number-input[type=number] {
  -moz-appearance: textfield;
}
</style> 