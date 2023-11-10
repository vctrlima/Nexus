import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@web/app/core/services';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  if (authService.isLoggedIn) return true;
  const router = inject(Router);
  router.navigate(['/login']);
  return false;
};
