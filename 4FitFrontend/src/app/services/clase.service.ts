import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clasa, CreateClasaRequest, InscriereClasa, TipClasa } from '../model/Utilizator';

@Injectable({ providedIn: 'root' })
export class ClaseService {
  private api = 'http://localhost:8081/api/clase';

  constructor(private http: HttpClient) {}

  getClase(): Observable<Clasa[]> {
    return this.http.get<Clasa[]>(this.api);
  }

  getToateClasele(): Observable<Clasa[]> {
    return this.http.get<Clasa[]>(`${this.api}/admin`);
  }

  getTipuriClase(): Observable<TipClasa[]> {
    return this.http.get<TipClasa[]>(`${this.api}/tipuri`);
  }

  creeazaClasa(request: CreateClasaRequest): Observable<Clasa> {
    return this.http.post<Clasa>(this.api, request);
  }

  inscrie(clasaId: number): Observable<InscriereClasa> {
    return this.http.post<InscriereClasa>(`${this.api}/${clasaId}/inscriere`, {});
  }

  retrage(clasaId: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${clasaId}/inscriere`);
  }
}
