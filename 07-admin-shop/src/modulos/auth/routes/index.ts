import type { RouteRecordRaw } from "vue-router";

export const authRoutes: RouteRecordRaw = {
    path: "/auth",
    name: 'auth',
    redirect: { name: 'login' },
    component: () => import('@/modulos/auth/layouts/AuthLayout.vue'),
    children: [
        {
            path: "/login",
            name: 'login',
            component: () => import('@/modulos/auth/views/LoginView.vue')
        },
        {
            path: "/register",
            name: 'register',
            component: () => import('@/modulos/auth/views/RegisterView.vue')
        }
    ]
}