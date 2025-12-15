export class Plano {
  constructor(
    private id: string,
    private nome: string,
    private codigo_registro_ans: string
  ) { }

  get Id(): string { return this.id }

  get Nome(): string { return this.nome }

  get CodigoRegistroAns(): string { return this.codigo_registro_ans }
}
