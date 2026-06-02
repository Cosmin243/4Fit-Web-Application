import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Abonament, InscriereClasa, Utilizator } from '../model/Utilizator';

@Injectable({ providedIn: 'root' })
export class MeService {
  private api = 'http://localhost:8081/api/me';

  constructor(private http: HttpClient) {}

  sync(): Observable<Utilizator> {
    return this.http.post<Utilizator>(`${this.api}/sync`, {});
  }

  getMe(): Observable<Utilizator> {
    return this.http.get<Utilizator>(this.api);
  }

  getAbonamente(): Observable<Abonament[]> {
    return this.http.get<Abonament[]>(`${this.api}/abonamente`);
  }

  getInscrieri(): Observable<InscriereClasa[]> {
    return this.http.get<InscriereClasa[]>(`${this.api}/inscrieri`);
  }

  uploadPozaProfil(file: File): Observable<Utilizator> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Utilizator>(`${this.api}/poza-profil`, formData);
  }

  stergePozaProfil(): Observable<Utilizator> {
    return this.http.delete<Utilizator>(`${this.api}/poza-profil`);
  }
}
