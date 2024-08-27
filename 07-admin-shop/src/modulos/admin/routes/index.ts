import type { RouteRecordRaw } from "vue-router";
import isAdminGuard from "@/modulos/auth/guards/is-admin.guard";
import isAuthenticatedGuard from "@/modulos/auth/guards/is-authenticated.guard";

export const adminRoutes: RouteRecordRaw = {
    path: "/admin",
    name: 'admin',
    beforeEnter: [ isAuthenticatedGuard, isAdminGuard ],
    redirect: { name: 'admin-dashboard'},
    component: () => import('@/modulos/admin/layouts/AdminLayout.vue'),
    children: [
        {
            path: 'dashboard',
            name: 'admin-dashboard',
            component: () => import('@/modulos/admin/views/DashboardView.vue')
        },
        {
            path: 'products',
            name: 'admin-products',
            component: () => import('@/modulos/admin/views/ProductsView.vue')
        },
        {
            path: 'products/:productId',
            name: 'admin-product',
            props: true,
            component: () => import('@/modulos/admin/views/ProductView.vue')
        }
    ]
}