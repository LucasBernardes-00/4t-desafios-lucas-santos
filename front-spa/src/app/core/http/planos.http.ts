import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { InPlano } from './interfaces/planos';
import { firstValueFrom } from 'rxjs';

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

  save(planos: InPlano) {
    return this.http.post(`${this.apiUrl}`, planos)
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  update(id: string, plano: InPlano) {
    return this.http.put(`${this.apiUrl}/${id}`, plano)
  }

  getById(id: string) {
    return this.http.get<InPlano>(`${this.apiUrl}/${id}`)
  }

  async getByRegistroANS(ans: string) {
    return await firstValueFrom(this.http.get<InPlano[]>(`${this.apiUrl}?codigo_registro_ans=${ans}`))
  }
}
