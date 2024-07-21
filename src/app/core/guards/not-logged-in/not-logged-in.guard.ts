import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../../../auth/shared/services/auth.service";

export const notLoggedInGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated) {
    return true;
  } else {
    router.navigateByUrl("/login");
    return false;
  }
};
