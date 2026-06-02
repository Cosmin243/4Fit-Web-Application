import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloak = inject(KeycloakService);

  if (!req.url.startsWith('http://localhost:8081/api')) {
    return next(req);
  }

  return from(addAuthHeader(req, keycloak)).pipe(
    switchMap(authReq => next(authReq))
  );
};

async function addAuthHeader(req: Parameters<HttpInterceptorFn>[0], keycloak: KeycloakService) {
  const loggedIn = await keycloak.isLoggedIn();
  if (!loggedIn) {
    return req;
  }

  await keycloak.updateToken(30);
  const token = await keycloak.getToken();

return req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
}
