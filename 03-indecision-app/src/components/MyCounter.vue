<template>
    <div>
        <h3>Counter: {{ contador }}</h3>
        <h3>Square: {{ squareCounter  }}</h3>

        <div>
            <button class="btn" @click="contador++">+1</button>
            <button class="btn" @click="contador--">-1</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useCounter } from '../composables/useCounter'

interface Props {
    value: number
}
const props = defineProps<Props>()

const { contador, squareCounter } = useCounter(props.value)
</script>

<style scoped>
.btn {
    @apply px-5 py-1 bg-blue-500 rounded hover:bg-blue-700 mr-2 
}
</style>