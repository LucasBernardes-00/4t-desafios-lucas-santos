import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { InPlano } from './interfaces/planos';

@Injectable({
  providedIn: 'root'
})
export class PlanosHttp {
  private apiUrl = 'http://localhost:3000/planos'

  private http = inject(HttpClient)

  constructor() { }

  list() {
    return this.http.get<InPlano[]>(`${this.apiUrl}`)
  }

  save(planos: string) {
    return this.http.post(`${this.apiUrl}`, planos)
  }
}
