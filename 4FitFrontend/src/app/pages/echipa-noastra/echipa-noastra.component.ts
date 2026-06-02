import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Antrenor } from '../../model/Utilizator';
import { AntrenoriService } from '../../services/antrenori.service';

@Component({
  selector: 'app-echipa-noastra',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './echipa-noastra.component.html'
})
export class EchipaNoastraComponent implements OnInit {
  trainers: Antrenor[] = [];
  eroare = '';

  constructor(private antrenoriService: AntrenoriService) {}

  ngOnInit(): void {
    this.antrenoriService.getAntrenori().subscribe({
      next: (antrenori) => this.trainers = antrenori,
      error: () => this.eroare = 'Nu s-au putut incarca antrenorii.'
    });
  }

  numeComplet(antrenor: Antrenor): string {
    return `${antrenor.prenume ?? ''} ${antrenor.nume ?? ''}`.trim();
  }

  specialitati(antrenor: Antrenor): string[] {
    return (antrenor.specialitate ?? '')
      .split(/[,&]/)
      .map(item => item.trim())
      .filter(Boolean);
  }
}
