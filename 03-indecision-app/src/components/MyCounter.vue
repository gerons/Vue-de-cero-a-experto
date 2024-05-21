<template>
    <div>
        <h3>Counter: {{ contador }}</h3>
        <h3>Square: {{ squareCounter  }}</h3>

        <div>
            <button @click="contador++">+1</button>
            <button @click="contador--">-1</button>
        </div>
    </div>
</template>

<script lang="ts"  setup>
import { defineProps, computed, ref } from 'vue'

const props = defineProps<{ value: number }>()

// ===============================
// DATA
// ===============================
const contador = ref(props.value)

// ===============================
// METODOS
// ===============================
const squareCounter = computed(() => {
    return contador.value * contador.value
})

</script>