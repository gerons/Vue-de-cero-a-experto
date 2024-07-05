import { createRouter, createWebHistory } from 'vue-router'
import PlantillaProyectos from '@/modulos/proyectos/plantillas/PlantillaProyectos.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: { name: 'proyectos'},
      component: PlantillaProyectos,
      children: [
        {
          path: '/proyectos',
          name: 'proyectos',
          component: () => import('@/modulos/proyectos/vistas/VistaProyectos.vue')
        }
      ]
    },
  ]
})

export default router
