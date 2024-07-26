<template>
  <div>
    <FullScreenLoader v-if="authST.isCheking"/>
    <RouterView v-else />
    
    <VueQueryDevtools />
  </div>
</template>

<script lang="ts" setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { useAuthStore } from './modulos/auth/stores/auth.store';
import { AuthStatus } from './modulos/auth/interfaces';
import { useRoute, useRouter } from 'vue-router';
import FullScreenLoader from './modulos/common/components/FullScreenLoader.vue';

const authST = useAuthStore()
const router = useRouter()
const route = useRoute()

authST.$subscribe( (_, state) => {
  if (state.authStatus === AuthStatus.Cheking) {
    authST.checkAuthStatus()
    return
  }

  if ( route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
    router.replace({ name: 'home' })
    return
  }
  
}, {
  immediate: true
})
</script>