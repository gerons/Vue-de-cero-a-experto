import { createRouter, createWebHistory } from 'vue-router'
import ShopLayout from '@/modulos/shop/layouts/ShopLayout.vue'
import { authRoutes } from '@/modulos/auth/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/modulos/shop/views/HomeView.vue')
        }
      ]
    },
    // Auth rutes
    authRoutes,
    
  ]
})

export default router
