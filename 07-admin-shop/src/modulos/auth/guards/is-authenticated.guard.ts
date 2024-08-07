import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { AuthStatus } from '../interfaces';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authST = useAuthStore()

  await authST.checkAuthStatus();

  (authST.authStatus === AuthStatus.UnAuthenticated)
    ? next({ name: 'login' })
    : next()
};

export default isAuthenticatedGuard;
