import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <h1>Bun venit, {{ username }}!</h1>
    <p>Roluri: {{ roles.join(', ') }}</p>
    <button (click)="logout()">Logout</button>
  `
})
export class DashboardComponent {
  username = '';
  roles: string[] = [];

  constructor(private authService: AuthService) {
    this.username = authService.getUsername();
    this.roles = authService.getRoles();
  }

  logout() {
    this.authService.logout();
  }
}
