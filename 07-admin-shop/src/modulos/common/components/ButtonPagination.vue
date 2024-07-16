<template>
    <div class="flex justify-center py-10 bg-gray-100 space-x-3">
        <button
            @click="$router.push({ query: { page: page - 1 }})"
            :disabled="page === 1"
            class="boton-navegacion"
        >
            <ArrowLeftIcon />
            <span>Anteriores</span>
        </button>

        <button
            @click="$router.push({ query: { page: page + 1 }})"
            :disabled="hasMoreData"
            class="boton-navegacion"
        >
            <span>Siguientes</span>
            <ArrowRghtIcon />
        </button>
        
    </div>
</template>

<script lang="ts" setup>
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue';
import ArrowRghtIcon from '@/icons/ArrowRghtIcon.vue';

interface Props {
    page: number
    hasMoreData: boolean
}

defineProps<Props>()

</script>

<style scoped>
.boton-navegacion {
    @apply flex items-center space-x-1.5 rounded-lg px-4 py-1.5 
         text-white bg-blue-500 disabled:bg-gray-300 
         hover:bg-blue-600 transition-all
}
</style>