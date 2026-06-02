import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Antrenor } from '../model/Utilizator';

@Injectable({ providedIn: 'root' })
export class AntrenoriService {
  private api = 'http://localhost:8081/api/antrenori';

  constructor(private http: HttpClient) {}

  getAntrenori(): Observable<Antrenor[]> {
    return this.http.get<Antrenor[]>(this.api);
  }
}
