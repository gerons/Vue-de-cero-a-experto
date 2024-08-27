<template>
    <div>
      <textarea
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value ?? '')"
        @blur="$emit('blur')"
        :class="['form-control', { 'border-red-500': error }]"
      />
      <span  v-if="error" class="text-red-400 text-xs">{{ error }}</span>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    modelValue?: string | number
    error?: string
}

defineProps<Props>()

defineEmits(['update:modelValue', 'blur'])
</script>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}

.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 h-32 text-gray-700 leading-tight focus:outline-none;
}
</style>