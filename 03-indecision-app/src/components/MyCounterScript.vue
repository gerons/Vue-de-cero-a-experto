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

<script lang="ts">
import { defineComponent } from 'vue'
import { useCounter } from '../composables/useCounter'

export default defineComponent({
    props: {
        value: {type: Number, required: true}
    },
    setup(props) {
        const { contador, squareCounter } = useCounter(props.value)

        return { contador, squareCounter }
    }
})

</script>