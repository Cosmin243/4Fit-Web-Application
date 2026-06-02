import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilizator } from '../model/Utilizator';

@Injectable({ providedIn: 'root' })
export class UtilizatorService {
  private api = 'http://localhost:8081/api/me';

  constructor(private http: HttpClient) {}

  getProfil(): Observable<Utilizator> {
    return this.http.get<Utilizator>(this.api);
  }

  getUtilizatori(): Observable<Utilizator[]> {
    return this.http.get<Utilizator[]>('http://localhost:8081/api/utilizatori');
  }

  baneaza(utilizatorId: number): Observable<Utilizator> {
    return this.http.patch<Utilizator>(`http://localhost:8081/api/utilizatori/${utilizatorId}/ban`, {});
  }

  debaneaza(utilizatorId: number): Observable<Utilizator> {
    return this.http.patch<Utilizator>(`http://localhost:8081/api/utilizatori/${utilizatorId}/deban`, {});
  }
}
