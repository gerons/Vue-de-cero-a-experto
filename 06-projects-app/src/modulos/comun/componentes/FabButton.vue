<template>
    <button
        @click="$emit('click')"
        :class="['btn btn-circle btn-secondary fixed', position]">
        <slot />
    </button>
</template>

<script lang="ts" setup>
interface Props {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

withDefaults(defineProps<Props>(), {
    position: 'bottom-right'
})

defineEmits(['click'])
</script>

<style scoped>
.top-left {
    @apply top-28 left-56
}

.top-right {
    @apply top-28 right-10
}

.bottom-left {
    @apply bottom-10 left-56
}

.bottom-right {
    @apply bottom-10 right-10
}
</style>