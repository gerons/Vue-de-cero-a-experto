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

<script lang="ts" src="./MyCounterScript2"></script>