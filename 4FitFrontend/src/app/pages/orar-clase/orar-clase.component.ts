import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClaseService } from '../../services/clase.service';
import { MeService } from '../../services/me.service';
import { Clasa, Utilizator } from '../../model/Utilizator';
import { ToastService } from '../../shared/toast/toast.service';

type DaySchedule = { label: string; date: string; classes: Clasa[] };

@Component({
  selector: 'app-orar-clase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orar-clase.component.html'
})
export class OrarClaseComponent implements OnInit {
  profil?: Utilizator;
  days: DaySchedule[] = [];
  eroare = '';

  constructor(
    private claseService: ClaseService,
    private meService: MeService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.meService.sync().subscribe({
      next: (profil) => {
        this.profil = profil;
        this.incarcaClase();
      },
      error: (err) => {
        this.eroare = 'Nu s-a putut incarca profilul.';
      }
    });
  }

  incarcaClase(): void {
    this.claseService.getClase().subscribe({
      next: (clase) => this.days = this.groupByDay(clase),
      error: (err) => {
        this.eroare = 'Nu s-a putut incarca orarul.';
      }
    });
  }

  categoryClass(category: string): string {
    const key = (category ?? '').toLowerCase();
    if (key.includes('pilates')) return 'border-purple-400';
    if (key.includes('karate')) return 'border-red-500';
    if (key.includes('yoga')) return 'border-green-500';
    if (key.includes('zumba')) return 'border-pink-500';
    return 'border-primary';
  }

  inscrie(clasa: Clasa): void {
    this.claseService.inscrie(clasa.id).subscribe({
      next: () => {
        this.toastService.success('Inscrierea a fost salvata.');
        this.incarcaClase();
      },
      error: () => {}
    });
  }

  retrage(clasa: Clasa): void {
    this.claseService.retrage(clasa.id).subscribe({
      next: () => {
        this.toastService.success('Inscrierea a fost anulata.');
        this.incarcaClase();
      },
      error: () => {}
    });
  }

  endTime(clasa: Clasa): Date {
    const start = new Date(clasa.dataOra);
    return new Date(start.getTime() + (clasa.durataMinute ?? 0) * 60000);
  }

  private groupByDay(clase: Clasa[]): DaySchedule[] {
    const formatterDay = new Intl.DateTimeFormat('ro-RO', { weekday: 'long' });
    const formatterDate = new Intl.DateTimeFormat('ro-RO', { day: '2-digit', month: 'short' });
    const map = new Map<string, DaySchedule>();
    const sortedClasses = clase
      .map(clasa => ({ ...clasa, imagineUrl: this.getClassImage(clasa) }))
      .sort((a, b) => new Date(a.dataOra).getTime() - new Date(b.dataOra).getTime());

    const monday = this.startOfWeek(new Date());
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const key = date.toDateString();
      map.set(key, {
        label: formatterDay.format(date),
        date: formatterDate.format(date),
        classes: []
      });
    }

    sortedClasses
      .filter(clasa => {
        const date = new Date(clasa.dataOra);
        return date >= monday && date <= sunday;
      })
      .forEach(clasa => {
      const date = new Date(clasa.dataOra);
      const key = date.toDateString();
      map.get(key)?.classes.push(clasa);
    });

    return [...map.values()];
  }

  private startOfWeek(date: Date): Date {
    const result = new Date(date);
    const day = result.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    result.setDate(result.getDate() + diff);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  private getClassImage(clasa: Clasa): string {
    const key = `${clasa.tipClasa ?? ''} ${clasa.nume ?? ''}`.toLowerCase();
    if (key.includes('yoga') || key.includes('pilates')) {
      return 'assets/service-trainer.jpg';
    }
    if (key.includes('zumba') || key.includes('aerobic') || key.includes('total')) {
      return 'assets/cardio-gym.jpg';
    }
    if (key.includes('karate')) {
      return 'assets/classes-gym.jpg';
    }
    return 'assets/classes-gym.jpg';
  }
}
