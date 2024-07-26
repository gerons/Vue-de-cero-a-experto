import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

const isAdminGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
    const authST = useAuthStore()

    await authST.checkAuthStatus();

    (authST.isAdmin)
        ? next()
        : next({ name: 'home' })
};

export default isAdminGuard;
