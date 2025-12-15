import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { BeneficiarioHttp } from '../../../core/http/beneficiario.http'
import { InBeneficiario } from '../../../core/http/interfaces/beneficiario'
import { InPlano } from '../../../core/http/interfaces/planos'
import { PlanosHttp } from '../../../core/http/planos.http'
import { ErrorDialogService } from '../../../shared/services/error-dialog.service'
import { SuccessDialogService } from '../../../shared/services/success-dialog.service'

@Component({
  selector: 'app-novo-beneficiario',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './novo-beneficiario.html',
})
export class NovoBeneficiario implements OnInit {
  private formBuilder = inject(NonNullableFormBuilder)
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)

  private http = inject(BeneficiarioHttp)
  private planosHttp = inject(PlanosHttp)
  private successDialogService = inject(SuccessDialogService)
  private errorDialogService = inject(ErrorDialogService)

  _form = this.formBuilder.group({
    nome_completo: ['', Validators.required],
    cpf: ['', Validators.required],
    data_nascimento: ['', Validators.required],
    status: ['ATIVO', Validators.required],
    planoId: ['', Validators.required],
    data_cadastro: [new Date().toISOString()]
  })

  public planos: InPlano[] = []
  public pageMode: 'create' | 'update' = 'create'
  public pageTitle: string = ''
  
  private beneficiarioId!: string
  private beneficiarioCPF!: string

  ngOnInit() {
    this.buildPlanosDropdown()

    this.activatedRoute.queryParams.subscribe(params => {
      if (!params['id']) {
        this.pageTitle = 'Cadastrar Beneficiário'
        return
      }

      this.pageMode = 'update'
      this.pageTitle = 'Atualizar Beneficiário'
      this.beneficiarioId = params['id']
      this.getBeneficiario_ToEdit()
    })
  }

  returnToList() {
    this.router.navigate(['/beneficiario/listar'])
  }

  getBeneficiario_ToEdit() {
    this.http.getById(this.beneficiarioId)
      .subscribe({
        next: (value) => {
          this.setForm_ToEdit(value)
          this.beneficiarioCPF = value.cpf
        },
        error: (err) => { 
          this.errorDialogService
            .setMessages(['Erro ao carregar beneficiário para edição'])
            .show()
        }
      })
  }

  setForm_ToEdit(beneficiario: InBeneficiario) {
    this._form.controls.cpf.setValue(beneficiario.cpf)
    this._form.controls.data_cadastro.setValue(beneficiario.data_cadastro)
    this._form.controls.data_nascimento.setValue(beneficiario.data_nascimento)
    this._form.controls.nome_completo.setValue(beneficiario.nome_completo)
    this._form.controls.planoId.setValue(beneficiario.planoId)
    this._form.controls.status.setValue(beneficiario.status)
  }

  async onSave() {
    if (this._form.invalid) {
      this.showErrors()
      return
    }

    if (!await this.isValid_ToSave()) return

    this.http.save(this._form.value as InBeneficiario)
      .subscribe({
        next: (value) => {
          this.successDialogService
            .setMessage('Beneficiário cadastrado')
            .setOnConfirm(this.returnToList.bind(this))
            .show()
        },
        error: (err) => { 
          this.errorDialogService
            .setMessages(['Erro ao tentar cadastrar beneficiário'])
            .show()
         }
      })
  }

  async onEdit() {
    if (this._form.invalid) {
      this.showErrors()
      return
    }

    if (!await this.isValid_ToUpdate()) return

    this.http.update(this.beneficiarioId, this._form.value as InBeneficiario)
      .subscribe({
        next: (value) => {
          this.successDialogService
            .setMessage('Beneficiário atualizado')
            .setOnConfirm(this.returnToList.bind(this))
            .show()
        },
        error: (err) => { 
          this.errorDialogService
            .setMessages(['Erro ao tentar atualizar beneficiário'])
            .show()
         }
      })
  }

  showErrors() {
    let errors: string[] = []

    if (!this._form.value.nome_completo)
      errors.push('Campo <strong>nome</strong> não foi preenchido')
    if (!this._form.value.cpf)
      errors.push('Campo <strong>CPF</strong> não foi preenchido')
    if (!this._form.value.data_nascimento)
      errors.push('Campo <strong>data de nascimento</strong> não foi preenchido')

    this.errorDialogService
      .setMessages(errors)
      .show()
  }

  async isValid_ToSave() {
    let errors: string[] = []
    if (await this.validateCPF_OnSave(errors)) return true

    this.errorDialogService
      .setMessages(errors)
      .show()

    return false
  }

  async isValid_ToUpdate() {
    let errors: string[] = []
    if (await this.validateCPF_OnUpdate(errors)) return true

    this.errorDialogService
      .setMessages(errors)
      .show()

    return false
  }

  async validateCPF_OnSave(errors: string[]) {
    let result = await this.http.getByCPF(this._form.value.cpf!)

    if (result.length <= 0) return true

    errors.push(`<strong>CPF</strong> já cadastrado.`)
    return false
  }

  async validateCPF_OnUpdate(errors: string[]) {
    if (this.beneficiarioCPF === this._form.controls.cpf.value) return true

    let result = await this.http.getByCPF(this._form.controls.cpf.value)

    if (result.length <= 0) return true

    errors.push(`<strong>CPF</strong> já cadastrado em outro usuário.`)
    return false
  }

  private buildPlanosDropdown() {
    this.planosHttp.list()
      .subscribe({
        next: (value) => {
          this.planos = value
          if (this.planos.length > 0)
            this._form.controls.planoId.setValue(this.planos[0].id!)
        },
        error: (error) => { 
          this.planos = []
         }
      })
  }
}
