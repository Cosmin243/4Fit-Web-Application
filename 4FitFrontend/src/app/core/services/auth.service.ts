import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private keycloak: KeycloakService) {}

  login(): void {
    this.keycloak.login();
  }

  logout(): void {
    this.keycloak.logout(window.location.origin + '/login');
  }

  isLoggedIn(): boolean {
    return this.keycloak.isLoggedIn();
  }

  getUsername(): string {
    return this.keycloak.getUsername();
  }

  async getToken(): Promise<string> {
    return await this.keycloak.getToken();
  }

  getRoles(): string[] {
    return this.keycloak.getUserRoles();
  }

  hasRole(role: string): boolean {
    return this.keycloak.getUserRoles().includes(role);
  }

  isAdminOrManager(): boolean {
    const roles = this.keycloak.getUserRoles().map(role => role.toUpperCase());
    return roles.includes('ADMIN') || roles.includes('ADMINISTRATOR') || roles.includes('ADMINSTRATOR') || roles.includes('MANAGER');
  }

  getTokenParsed(): any {
    return this.keycloak.getKeycloakInstance().tokenParsed;
  }
}
