import type { RouteRecordRaw } from "vue-router";
import isAdminGuard from "@/modulos/auth/guards/is-admin.guard";
import isAuthenticatedGuard from "@/modulos/auth/guards/is-authenticated.guard";

export const adminRoutes: RouteRecordRaw = {
    path: "/admin",
    name: 'admin',
    beforeEnter: [ isAuthenticatedGuard, isAdminGuard ],
    component: () => import('@/modulos/admin/layouts/AdminLayout.vue'),
    children: [

    ]
}