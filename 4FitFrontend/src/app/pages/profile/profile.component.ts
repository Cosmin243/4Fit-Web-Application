import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { AbonamenteService } from '../../services/abonamente.service';
import { MeService } from '../../services/me.service';
import { Utilizator } from '../../model/Utilizator';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  utilizator?: Utilizator;
  eroare = '';

  constructor(
    private meService: MeService,
    private abonamenteService: AbonamenteService,
    private toastService: ToastService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.incarcaProfil();
  }

  incarcaProfil(): void {
    this.meService.sync().subscribe({
      next: (profil) => this.utilizator = profil,
      error: (err) => {
        console.error('Eroare profil:', err);
        this.eroare = 'Eroare la incarcarea profilului.';
      }
    });
  }

  cumpara(tipAbonamentId: number): void {
    this.abonamenteService.cumpara(tipAbonamentId).subscribe({
      next: () => {
        this.toastService.success('Abonamentul a fost cumparat.');
        this.incarcaProfil();
      },
      error: (err) => {
        console.error('Eroare cumparare:', err);
      }
    });
  }

  schimbaPoza(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    this.meService.uploadPozaProfil(file).subscribe({
      next: (profil) => {
        this.utilizator = profil;
        this.toastService.success('Poza de profil a fost salvata.');
        input.value = '';
      },
      error: () => {
        input.value = '';
      }
    });
  }

  stergePoza(): void {
    this.meService.stergePozaProfil().subscribe({
      next: (profil) => {
        this.utilizator = profil;
        this.toastService.success('Poza de profil a fost stearsa.');
      },
      error: () => {}
    });
  }
}
