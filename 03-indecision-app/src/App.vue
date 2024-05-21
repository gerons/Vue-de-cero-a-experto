<template>
    <div>
        <h1>Mi primer app</h1>

        <hr>

        <MyCounter
            :value="5"
        />
    </div>
</template>

<script lang="ts"  setup>
import MyCounter from './components/MyCounter.vue'



</script>
