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
  border: 2px solid rgba(60, 60, 136, 0.5);
  border-radius: 8px;
  background: rgba(60, 60, 136, 0.2);
  backdrop-filter: blur(10px);
  color: #FFFFFF;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.difficulty-button:hover {
  border-color: #FFFFFF;
  background: rgba(60, 60, 136, 0.3);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.difficulty-button.selected {
  border-color: #FFFFFF;
  background: rgba(255, 255, 255, 0.2);
  color: #FFFFFF;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.difficulty-button.selected:hover {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.5);
}
</style> 