<script setup>
const model = defineModel({ required: true })

defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
})

defineEmits(['blur'])
</script>

<template>
  <div class="field">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :aria-invalid="Boolean(error)"
      @blur="$emit('blur')"
    />
    <p v-if="error" class="field-error">{{ error }}</p>
  </div>
</template>
