import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { InBeneficiario } from './interfaces/beneficiario'
import { firstValueFrom } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioHttp {
  private apiUrl = 'http://localhost:3000/beneficiarios'

  private http = inject(HttpClient)

  constructor() { }

  list() {
    return this.http.get<InBeneficiario[]>(`${this.apiUrl}?_embed=plano`)
  }

  save(beneficiario: InBeneficiario) {
    return this.http.post(`${this.apiUrl}`, beneficiario)
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  update(id: string, beneficiario: InBeneficiario) {
    return this.http.put(`${this.apiUrl}/${id}`, beneficiario)
  }

  async getByCPF(cpf: string) {
    return await firstValueFrom(this.http.get<InBeneficiario[]>(`${this.apiUrl}?cpf=${cpf}`))
  }

  getById(id: string) {
    return this.http.get<InBeneficiario>(`${this.apiUrl}/${id}`)
  }

  async getByPlano(planoId: string) {
    return await firstValueFrom(this.http.get<InBeneficiario[]>(`${this.apiUrl}?planoId=${planoId}`))
  }

  getBeneficiarios_WithFilter(filter: string = "") {
    return this.http.get<InBeneficiario[]>(`${this.apiUrl}?_embed=plano${filter}`)
  }
}
