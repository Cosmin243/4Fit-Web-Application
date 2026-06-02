import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Abonament, TipAbonament } from '../model/Utilizator';

@Injectable({ providedIn: 'root' })
export class AbonamenteService {
  private api = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  getTipuriAbonamente(): Observable<TipAbonament[]> {
    return this.http.get<TipAbonament[]>(`${this.api}/tip-abonamente`);
  }

  cumpara(tipAbonamentId: number): Observable<Abonament> {
    return this.http.post<Abonament>(`${this.api}/abonamente/cumpara/${tipAbonamentId}`, {});
  }
}
