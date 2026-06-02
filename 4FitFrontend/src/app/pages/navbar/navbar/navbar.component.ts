import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  open = false;

  servicii = [
    { label: 'Sala de fitness', routerLink: '/sala-fitness' },
    { label: 'Bazin de înot', routerLink: '/bazin-inot' },
    { label: 'Antrenor personal', routerLink: '/antrenor-personal' }
  ];

  clase = [
    { label: 'Aerobic', routerLink: '/aerobic' },
    { label: 'Karate', routerLink: '/karate' },
    { label: 'Yoga', routerLink: '/yoga' },
    { label: 'Pilates', routerLink: '/pilates' },
    { label: 'Zumba', routerLink: '/zumba' }
  ];

  constructor(public authService: AuthService, private router: Router) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get isAdminOrManager(): boolean {
    return this.authService.isAdminOrManager();
  }

  close(): void { this.open = false; }

  logout(): void {
    this.close();
    this.authService.logout();
  }

  goToProfile(): void {
    this.close();
    this.router.navigate(['/profil']);
  }
}
