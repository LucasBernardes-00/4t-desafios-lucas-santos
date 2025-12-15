import { Plano } from "./plano"

export class Beneficiario {
  constructor(
    private nome_completo: string,
    private cpf: string,
    private data_nascimento: Date,
    private status: string,
    private plano: Plano,
    private data_cadastro: string,
    private id: string
  ) { }

  get Nome() { return this.nome_completo }
  get CPF() { return this.cpf }
  get CPF_Formatado() { return `${this.cpf.slice(0,3)}.${this.cpf.slice(3, 6)}.${this.cpf.slice(6, 9)}-${this.cpf.slice(9, 11)}` }
  get DataNascimento() { return this.data_nascimento }
  get DataNascimentoFormatada() { return `${this.data_nascimento.getDate() + 1}/${this.data_nascimento.getMonth() + 1}/${this.data_nascimento.getFullYear()}` }
  get Status() { return this.status }
  get Plano_Nome() { return this.plano.Nome }
  get DataCadastro() { return this.data_cadastro }
  get Id() { return this.id }
}
