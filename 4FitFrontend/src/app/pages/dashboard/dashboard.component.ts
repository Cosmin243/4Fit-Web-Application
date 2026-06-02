import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  username = '';
  roles: string[] = [];

  constructor(private authService: AuthService) {
    this.username = authService.getUsername();
    this.roles = authService.getRoles();
    console.log(this.roles);
    console.log(this.username);
  }

  logout() {
    this.authService.logout();
  }
}
