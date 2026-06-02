import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AntrenoriService } from '../../services/antrenori.service';
import { ClaseService } from '../../services/clase.service';
import { UtilizatorService } from '../../services/utilizator.service';
import { Antrenor, Clasa, CreateClasaRequest, TipClasa, Utilizator } from '../../model/Utilizator';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-administrare',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <section class="py-12 md:py-16">
      <div class="container space-y-8">
        <div>
          <p class="section-eyebrow">Administrare</p>
          <h1 class="text-3xl md:text-5xl font-bold">Panou de administrare</h1>
        </div>

        <p *ngIf="eroare" class="text-sm text-primary">{{ eroare }}</p>

        <div class="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6">
          <form [formGroup]="clasaForm" (ngSubmit)="creeazaClasa()" class="bg-card border border-border rounded p-5 space-y-4">
            <div>
              <h2 class="font-heading text-xl font-semibold">Curs nou</h2>
              <p class="text-sm text-muted-foreground mt-1">Adauga o clasa noua in orar.</p>
            </div>

            <label class="block text-sm">
              <span class="text-muted-foreground">Nume curs</span>
              <input formControlName="nume" class="mt-1 w-full bg-background border border-border rounded px-3 py-2 outline-none focus:border-primary" [ngClass]="campInvalid('nume') ? 'border-primary' : ''" />
              <span *ngIf="campInvalid('nume')" class="text-primary text-xs mt-1 block">Completeaza numele cursului.</span>
            </label>

            <label class="block text-sm">
              <span class="text-muted-foreground">Tip curs</span>
              <select formControlName="tipClasaId" class="mt-1 w-full bg-background border border-border rounded px-3 py-2 outline-none focus:border-primary" [ngClass]="campInvalid('tipClasaId') ? 'border-primary' : ''">
                <option [ngValue]="null">Alege tipul</option>
                <option *ngFor="let tip of tipuriClase" [ngValue]="tip.id">{{ tip.nume }}</option>
              </select>
              <span *ngIf="campInvalid('tipClasaId')" class="text-primary text-xs mt-1 block">Alege tipul cursului.</span>
            </label>

            <label class="block text-sm">
              <span class="text-muted-foreground">Antrenor</span>
              <select formControlName="antrenorId" class="mt-1 w-full bg-background border border-border rounded px-3 py-2 outline-none focus:border-primary" [ngClass]="campInvalid('antrenorId') ? 'border-primary' : ''">
                <option [ngValue]="null">Alege antrenorul</option>
                <option *ngFor="let antrenor of antrenoriFiltrati" [ngValue]="antrenor.id">{{ antrenor.prenume }} {{ antrenor.nume }}</option>
              </select>
              <span *ngIf="campInvalid('antrenorId')" class="text-primary text-xs mt-1 block">Alege un antrenor potrivit pentru tipul cursului.</span>
              <span *ngIf="tipClasaSelectat && !antrenoriFiltrati.length" class="text-muted-foreground text-xs mt-1 block">Nu exista antrenori activi pentru acest tip de curs.</span>
            </label>

            <div>
              <label class="block text-sm">
                <span class="text-muted-foreground">Data si ora</span>
                <input type="datetime-local"
                       formControlName="dataOra"
                       [min]="inceputSaptamanaInput"
                       [max]="sfarsitSaptamanaInput"
                       class="mt-1 w-full bg-background border border-border rounded px-3 py-2 outline-none focus:border-primary"
                       [ngClass]="campInvalid('dataOra') ? 'border-primary' : ''" />
                <span *ngIf="campInvalid('dataOra')" class="text-primary text-xs mt-1 block">Alege o data din saptamana curenta.</span>
                <span class="text-muted-foreground text-xs mt-1 block">Poti adauga cursuri doar pentru saptamana curenta.</span>
              </label>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label class="block text-sm">
                <span class="text-muted-foreground">Durata</span>
                <input type="number" min="1" formControlName="durataMinute" class="mt-1 w-full bg-background border border-border rounded px-3 py-2 outline-none focus:border-primary" [ngClass]="campInvalid('durataMinute') ? 'border-primary' : ''" />
                <span *ngIf="campInvalid('durataMinute')" class="text-primary text-xs mt-1 block">Durata trebuie sa fie mai mare decat 0.</span>
              </label>

              <label class="block text-sm">
                <span class="text-muted-foreground">Locuri</span>
                <input type="number" min="1" formControlName="maxParticipanti" class="mt-1 w-full bg-background border border-border rounded px-3 py-2 outline-none focus:border-primary" [ngClass]="campInvalid('maxParticipanti') ? 'border-primary' : ''" />
                <span *ngIf="campInvalid('maxParticipanti')" class="text-primary text-xs mt-1 block">Numarul de locuri trebuie sa fie mai mare decat 0.</span>
              </label>
            </div>

            <button type="submit" class="btn btn-primary w-full" [disabled]="salvareClasa">
              {{ salvareClasa ? 'Se salveaza...' : 'Creeaza curs' }}
            </button>
          </form>

          <div class="bg-card border border-border rounded overflow-hidden">
            <div class="p-5 border-b border-border flex items-center justify-between gap-3">
              <div>
                <h2 class="font-heading text-xl font-semibold">Toate cursurile</h2>
                <p class="text-sm text-muted-foreground">{{ claseAfisate.length }} cursuri afisate</p>
              </div>
              <div class="flex items-center gap-3">
                <select [(ngModel)]="filtruClase" class="bg-background border border-border rounded px-3 py-2 text-sm outline-none focus:border-primary">
                  <option value="curenta">Saptamana curenta</option>
                  <option value="toate">Toate cursurile</option>
                </select>
                <button type="button" class="btn btn-outline !min-h-10" (click)="incarcaDate()">Reincarca</button>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead class="bg-secondary text-muted-foreground">
                  <tr>
                    <th class="text-left p-3 font-medium">Curs</th>
                    <th class="text-left p-3 font-medium">Tip</th>
                    <th class="text-left p-3 font-medium">Antrenor</th>
                    <th class="text-left p-3 font-medium">Data</th>
                    <th class="text-left p-3 font-medium">Locuri</th>
                    <th class="text-left p-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let clasa of claseAfisate" class="border-t border-border">
                    <td class="p-3 font-medium">{{ clasa.nume }}</td>
                    <td class="p-3 text-muted-foreground">{{ clasa.tipClasa }}</td>
                    <td class="p-3 text-muted-foreground">{{ clasa.antrenor }}</td>
                    <td class="p-3 text-muted-foreground">{{ clasa.dataOra | date:'dd.MM.yyyy HH:mm' }}</td>
                    <td class="p-3 text-muted-foreground">{{ clasa.participantiInscrisi }}/{{ clasa.maxParticipanti }}</td>
                    <td class="p-3">
                      <span class="px-2 py-1 rounded text-xs" [ngClass]="clasa.activa ? 'bg-green-500/15 text-green-400' : 'bg-secondary text-muted-foreground'">
                        {{ clasa.activa ? 'Activ' : 'Inactiv' }}
                      </span>
                    </td>
                  </tr>
                  <tr *ngIf="!claseAfisate.length">
                    <td colspan="6" class="p-6 text-center text-muted-foreground">Nu exista cursuri.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="bg-card border border-border rounded overflow-hidden">
          <div class="p-5 border-b border-border flex items-center justify-between gap-3">
            <div>
              <h2 class="font-heading text-xl font-semibold">Abonati</h2>
              <p class="text-sm text-muted-foreground">{{ abonatiAfisati.length }} abonati afisati</p>
            </div>
            <select [(ngModel)]="filtruAbonati" class="bg-background border border-border rounded px-3 py-2 text-sm outline-none focus:border-primary">
              <option value="activi">Activi</option>
              <option value="banati">Banati</option>
              <option value="toti">Toti abonatii</option>
            </select>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-secondary text-muted-foreground">
                <tr>
                  <th class="text-left p-3 font-medium">Nume</th>
                  <th class="text-left p-3 font-medium">Email</th>
                  <th class="text-left p-3 font-medium">Abonamente</th>
                  <th class="text-left p-3 font-medium">Status</th>
                  <th class="text-right p-3 font-medium">Actiuni</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let utilizator of abonatiAfisati" class="border-t border-border">
                  <td class="p-3 font-medium">{{ utilizator.prenume }} {{ utilizator.nume }}</td>
                  <td class="p-3 text-muted-foreground">{{ utilizator.email }}</td>
                  <td class="p-3 text-muted-foreground">
                    <div *ngIf="utilizator.abonamenteActive?.length; else faraAbonamente" class="space-y-1">
                      <div *ngFor="let abonament of utilizator.abonamenteActive">
                        <span class="font-medium text-foreground">{{ abonament.tipAbonament }}</span>
                        <span class="text-xs"> - pana la {{ abonament.dataEnd | date:'dd.MM.yyyy' }}</span>
                      </div>
                    </div>
                    <ng-template #faraAbonamente>
                      <span>Fara abonament activ</span>
                    </ng-template>
                  </td>
                  <td class="p-3">
                    <span class="px-2 py-1 rounded text-xs" [ngClass]="esteBanat(utilizator) ? 'bg-primary/15 text-primary' : 'bg-green-500/15 text-green-400'">
                      {{ utilizator.status || 'ACTIV' }}
                    </span>
                  </td>
                  <td class="p-3 text-right">
                    <button type="button"
                            class="btn !min-h-9 !px-3"
                            [ngClass]="esteBanat(utilizator) ? 'btn-outline' : 'btn-primary'"
                            (click)="toggleBan(utilizator)"
                            [disabled]="utilizatorInLucru === utilizator.id">
                      {{ esteBanat(utilizator) ? 'Debaneaza' : 'Baneaza' }}
                    </button>
                  </td>
                </tr>
                <tr *ngIf="!abonatiAfisati.length">
                  <td colspan="5" class="p-6 text-center text-muted-foreground">Nu exista abonati pentru filtrul selectat.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AdministrareComponent implements OnInit {
  private fb = inject(FormBuilder);
  private utilizatorService = inject(UtilizatorService);
  private claseService = inject(ClaseService);
  private antrenoriService = inject(AntrenoriService);
  private toastService = inject(ToastService);

  utilizatori: Utilizator[] = [];
  clase: Clasa[] = [];
  tipuriClase: TipClasa[] = [];
  antrenori: Antrenor[] = [];
  eroare = '';
  salvareClasa = false;
  utilizatorInLucru?: number;
  filtruClase: 'curenta' | 'toate' = 'curenta';
  filtruAbonati: 'activi' | 'banati' | 'toti' = 'activi';

  clasaForm = this.fb.group({
    nume: ['', Validators.required],
    tipClasaId: [null as number | null, Validators.required],
    antrenorId: [null as number | null, Validators.required],
    dataOra: ['', Validators.required],
    durataMinute: [60, [Validators.required, Validators.min(1)]],
    maxParticipanti: [20, [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {
    this.clasaForm.controls.tipClasaId.valueChanges.subscribe(() => {
      this.clasaForm.controls.antrenorId.setValue(null);
    });
    this.incarcaDate();
  }

  incarcaDate(): void {
    this.eroare = '';
    forkJoin({
      utilizatori: this.utilizatorService.getUtilizatori(),
      clase: this.claseService.getToateClasele(),
      tipuriClase: this.claseService.getTipuriClase(),
      antrenori: this.antrenoriService.getAntrenori()
    }).subscribe({
      next: ({ utilizatori, clase, tipuriClase, antrenori }) => {
        this.utilizatori = utilizatori;
        this.clase = clase;
        this.tipuriClase = tipuriClase;
        this.antrenori = antrenori;
      },
      error: () => this.eroare = 'Nu s-au putut incarca datele de administrare.'
    });
  }

  creeazaClasa(): void {
    if (this.clasaForm.invalid) {
      this.clasaForm.markAllAsTouched();
      this.toastService.error('Completeaza toate campurile obligatorii pentru a crea cursul.');
      return;
    }

    if (!this.antrenorEstePotrivit(this.clasaForm.controls.antrenorId.value)) {
      this.clasaForm.controls.antrenorId.setValue(null);
      this.clasaForm.controls.antrenorId.markAsTouched();
      this.toastService.error('Alege un antrenor potrivit pentru tipul de curs selectat.');
      return;
    }

    if (!this.dataEsteInSaptamanaCurenta(this.clasaForm.controls.dataOra.value)) {
      this.clasaForm.controls.dataOra.setErrors({ saptamanaCurenta: true });
      this.clasaForm.controls.dataOra.markAsTouched();
      this.toastService.error('Poti crea cursuri doar pentru saptamana curenta.');
      return;
    }

    this.salvareClasa = true;
    const formValue = this.clasaForm.getRawValue();
    const request: CreateClasaRequest = {
      nume: formValue.nume ?? '',
      tipClasaId: formValue.tipClasaId!,
      antrenorId: formValue.antrenorId!,
      dataOra: formValue.dataOra ?? '',
      durataMinute: formValue.durataMinute ?? 60,
      maxParticipanti: formValue.maxParticipanti ?? 20
    };

    this.claseService.creeazaClasa(request).subscribe({
      next: () => {
        this.toastService.success('Cursul a fost creat.');
        this.clasaForm.reset({ durataMinute: 60, maxParticipanti: 20 });
        this.salvareClasa = false;
        this.incarcaDate();
      },
      error: () => this.salvareClasa = false
    });
  }

  toggleBan(utilizator: Utilizator): void {
    this.utilizatorInLucru = utilizator.id;
    const request$ = this.esteBanat(utilizator)
      ? this.utilizatorService.debaneaza(utilizator.id)
      : this.utilizatorService.baneaza(utilizator.id);

    request$.subscribe({
      next: (actualizat) => {
        this.utilizatori = this.utilizatori.map(item => item.id === actualizat.id ? actualizat : item);
        this.toastService.success(this.esteBanat(actualizat) ? 'Utilizatorul a fost banat.' : 'Utilizatorul a fost debanat.');
        this.utilizatorInLucru = undefined;
      },
      error: () => this.utilizatorInLucru = undefined
    });
  }

  esteBanat(utilizator: Utilizator): boolean {
    return (utilizator.status ?? '').toUpperCase() === 'BANAT';
  }

  get tipClasaSelectat(): TipClasa | undefined {
    const tipClasaId = this.clasaForm.controls.tipClasaId.value;
    return this.tipuriClase.find(tip => tip.id === tipClasaId);
  }

  get antrenoriFiltrati(): Antrenor[] {
    const tipClasa = this.tipClasaSelectat;
    if (!tipClasa) {
      return [];
    }

    const tipNormalizat = this.normalizeaza(tipClasa.nume);
    return this.antrenori.filter(antrenor => {
      const specialitate = this.normalizeaza(antrenor.specialitate);
      return specialitate.includes(tipNormalizat) || tipNormalizat.includes(specialitate);
    });
  }

  get claseAfisate(): Clasa[] {
    if (this.filtruClase === 'toate') {
      return this.clase;
    }

    const start = this.startOfCurrentWeek();
    const end = this.startOfCurrentWeek();
    end.setDate(end.getDate() + 6);
    end.setHours(23, 59, 59, 999);

    return this.clase.filter(clasa => {
      const dataOra = new Date(clasa.dataOra);
      return dataOra >= start && dataOra <= end;
    });
  }

  get abonatiAfisati(): Utilizator[] {
    return this.utilizatori
      .filter(utilizator => this.esteAbonat(utilizator))
      .filter(utilizator => {
        if (this.filtruAbonati === 'toti') {
          return true;
        }

        const banat = this.esteBanat(utilizator);
        return this.filtruAbonati === 'banati' ? banat : !banat;
      });
  }

  get inceputSaptamanaInput(): string {
    return this.toDateTimeLocalInput(this.startOfCurrentWeek());
  }

  get sfarsitSaptamanaInput(): string {
    const end = this.startOfCurrentWeek();
    end.setDate(end.getDate() + 6);
    end.setHours(23, 59, 0, 0);
    return this.toDateTimeLocalInput(end);
  }

  campInvalid(numeCamp: keyof typeof this.clasaForm.controls): boolean {
    const control: AbstractControl | null = this.clasaForm.get(numeCamp);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  private antrenorEstePotrivit(antrenorId: number | null): boolean {
    return antrenorId !== null && this.antrenoriFiltrati.some(antrenor => antrenor.id === antrenorId);
  }

  private esteAbonat(utilizator: Utilizator): boolean {
    const rol = (utilizator.rol ?? '').toUpperCase();
    return rol === 'ABONAT' || rol === 'USER';
  }

  private dataEsteInSaptamanaCurenta(value: string | null): boolean {
    if (!value) {
      return false;
    }

    const data = new Date(value);
    const start = this.startOfCurrentWeek();
    const end = this.startOfCurrentWeek();
    end.setDate(end.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return data >= start && data <= end;
  }

  private startOfCurrentWeek(): Date {
    const result = new Date();
    const day = result.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    result.setDate(result.getDate() + diff);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  private toDateTimeLocalInput(date: Date): string {
    const pad = (value: number) => value.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  private normalizeaza(value?: string): string {
    return (value ?? '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }
}
