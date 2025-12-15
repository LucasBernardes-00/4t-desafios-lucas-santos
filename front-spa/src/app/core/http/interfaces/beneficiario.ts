import { InPlano } from "./planos"

export interface InBeneficiario {
  id: string
  nome_completo: string
  cpf: string
  data_nascimento: string
  status: string
  planoId: string
  plano: InPlano
  data_cadastro: string
}
