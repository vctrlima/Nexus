import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services';

export const notLoggedInGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  if (!authService.isLoggedIn) return true;
  const router = inject(Router);
  router.navigate(['/']);
  return false;
};
