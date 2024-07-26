import { createRouter, createWebHistory } from 'vue-router'
import ShopLayout from '@/modulos/shop/layouts/ShopLayout.vue'
import { authRoutes } from '@/modulos/auth/routes'
import { adminRoutes } from '@/modulos/admin/routes'

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
    // Auth routes
    authRoutes,
    // Admin routes
    adminRoutes,
  ]
})

export default router
