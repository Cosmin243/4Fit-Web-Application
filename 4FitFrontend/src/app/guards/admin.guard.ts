import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

const ADMIN_ROLES = ['ADMIN', 'ADMINISTRATOR', 'ADMINSTRATOR', 'MANAGER'];

export const adminGuard: CanActivateFn = async () => {
  const keycloak = inject(KeycloakService);
  const router = inject(Router);

  const loggedIn = await keycloak.isLoggedIn();
  if (!loggedIn) {
    await keycloak.login({ redirectUri: window.location.origin + '/administrare' });
    return false;
  }

  const roles = keycloak.getUserRoles().map(role => role.toUpperCase());
  if (ADMIN_ROLES.some(role => roles.includes(role))) {
    return true;
  }

  return router.createUrlTree(['/profil']);
};
