import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../../../auth/shared/services/auth.service";

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const newReq = req.clone({headers: req.headers.set("Authorization", `Bearer ${authService.token}`)});
  return next(newReq);
};
