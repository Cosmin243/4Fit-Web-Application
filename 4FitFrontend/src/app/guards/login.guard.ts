import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

export const loginGuard: CanActivateFn = async () => {
  const keycloak = inject(KeycloakService);
  const router = inject(Router);

  if (await keycloak.isLoggedIn()) {
    router.navigate(['/profil']);
    return false;
  }
  return true;
};
