import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { InPlano } from '../../../core/http/interfaces/planos'
import { PlanosHttp } from '../../../core/http/planos.http'
import { ErrorDialogService } from '../../../shared/services/error-dialog.service'
import { SuccessDialogService } from '../../../shared/services/success-dialog.service'

@Component({
  selector: 'app-novo-plano.component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './novo-plano.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoPlanoComponent implements OnInit {
  private formBuilder = inject(NonNullableFormBuilder)
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)

  private http = inject(PlanosHttp)
  private successDialogService = inject(SuccessDialogService)
  private errorDialogService = inject(ErrorDialogService)

  public pageMode: 'create' | 'update' = 'create'
  public pageTitle: string = ''
  public _form = this.formBuilder.group({
    nome: ['', Validators.required],
    codigo_registro_ans: ['', Validators.required]
  })
  
  private planoId!: string
  private registroANS!: string

  ngOnInit(): void {
    this.verifyRouterParams()
  }

  returnToList() {
    this.router.navigate(['/plano/listar'])
  }

  
  async onSave() {
    if (this._form.invalid) {
      this.showErrors()
      return
    }

    if (!await this.isValid_ToSave()) return

    this.http.save(this._form.value as InPlano)
      .subscribe({
        next: (value) => {
          this.successDialogService
            .setMessage('Plano cadastrado')
            .setOnConfirm(this.returnToList.bind(this))
            .show()
        },
        error: (err) => { 
          this.errorDialogService
            .setMessages(['Erro ao tentar cadastrar plano'])
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

    this.http.update(this.planoId, this._form.value as InPlano)
      .subscribe({
        next: (value) => {
          this.successDialogService
            .setMessage('Plano atualizado')
            .setOnConfirm(this.returnToList.bind(this))
            .show()
        },
        error: (err) => { 
          this.errorDialogService
            .setMessages(['Erro ao tentar atualizar plano'])
            .show()
          }
      })
  }

  private verifyRouterParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (!params['id']) {
        this.pageTitle = 'Cadastrar Plano'
        return
      }

      this.pageMode = 'update'
      this.pageTitle = 'Atualizar Plano'
      this.planoId = params['id']
      this.getPlano_ToEdit()
    })
  }

  private getPlano_ToEdit() {
    this.http.getById(this.planoId)
      .subscribe({
        next: (value) => {
          this.setForm_ToEdit(value)
          this.registroANS = value.codigo_registro_ans
        },
        error: (err) => { 
          this.errorDialogService
            .setMessages(['Erro ao carregar plano para edição'])
            .show()
        }
      })
  }

  private setForm_ToEdit(plano: InPlano) {
    this._form.controls.nome.setValue(plano.nome)
    this._form.controls.codigo_registro_ans.setValue(plano.codigo_registro_ans)
  }

  private showErrors() {
    let errors: string[] = []

    if (!this._form.value.nome)
      errors.push('Campo <strong>nome</strong> não foi preenchido')
    if (!this._form.value.codigo_registro_ans)
      errors.push('Campo <strong>registro ANS</strong> não foi preenchido')

    this.errorDialogService
      .setMessages(errors)
      .show()
  }

  private async isValid_ToSave() {
    let errors: string[] = []
    if (await this.validateRegistroANS_OnSave(errors)) return true

    this.errorDialogService
      .setMessages(errors)
      .show()

    return false
  }

  private async validateRegistroANS_OnSave(errors: string[]) {
    let result = await this.http.getByRegistroANS(this._form.value.codigo_registro_ans!)

    if (result.length <= 0) return true

    errors.push(`<strong>Registro ANS</strong> já cadastrado.`)
    return false
  }

  async isValid_ToUpdate() {
    let errors: string[] = []
    if (await this.validateRegistroANS_OnUpdate(errors)) return true

    this.errorDialogService
      .setMessages(errors)
      .show()

    return false
  }

  async validateRegistroANS_OnUpdate(errors: string[]) {
    if (this.registroANS === this._form.controls.codigo_registro_ans.value) return true

    let result = await this.http.getByRegistroANS(this._form.controls.codigo_registro_ans.value)

    if (result.length <= 0) return true

    errors.push(`<strong>Registro ANS</strong> já cadastrado em outro plano.`)
    return false
  }
}
