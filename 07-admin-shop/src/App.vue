<template>
  <div>
    <RouterView />
    <VueQueryDevtools />
  </div>
</template>

<script lang="ts" setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>