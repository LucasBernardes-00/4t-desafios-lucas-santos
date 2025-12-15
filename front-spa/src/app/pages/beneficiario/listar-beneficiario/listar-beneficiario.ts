import { CommonModule } from "@angular/common"
import { ChangeDetectorRef, Component, inject, OnInit } from "@angular/core"
import { Router, RouterLink } from "@angular/router"
import { BeneficiarioHttp } from "../../../core/http/beneficiario.http"
import { InBeneficiario } from "../../../core/http/interfaces/beneficiario"
import { Beneficiario } from "../../../core/models/beneficiario"
import { Plano } from "../../../core/models/plano"
import { ErrorDialogService } from "../../../shared/services/error-dialog.service"
import { ConfirmActionService } from "../../../shared/services/modal-confirmation.service"
import { SuccessDialogService } from "../../../shared/services/success-dialog.service"
import { PlanosHttp } from "../../../core/http/planos.http"
import { InPlano } from "../../../core/http/interfaces/planos"

interface inListaBeneficiarioFiltro {
  status: {
    inUse: boolean,
    value: 'ATIVO' | 'INATIVO' | ''
  },
  plano: {
    inUse: boolean,
    id: string
  }
}

@Component({
  selector: 'app-listar-beneficiario',
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-beneficiario.html'
})
export class ListarBeneficiario implements OnInit {
  beneficiarios: Beneficiario[] = []
  planos: InPlano[] = []

  private filter: inListaBeneficiarioFiltro = {
    status: {
      inUse: false,
      value: ""
    },
    plano: {
      inUse: false,
      id: ""      
    }
  }

  private http = inject(BeneficiarioHttp)
  private planosHttp = inject(PlanosHttp)
  private cd = inject(ChangeDetectorRef)
  private router = inject(Router)

  private confirmActioncService = inject(ConfirmActionService)
  private successDialogService = inject(SuccessDialogService)
  private errorDialogService = inject(ErrorDialogService)

  constructor() { }

  ngOnInit(): void {
    this.searchBeneficiarios()
    this.buildPlanosDropdown()
  }

  private searchBeneficiarios() {
    this.http.list()
      .subscribe({
        next: (value) => {
          this.buildDataForTable(value)
          this.cd.detectChanges()
        },
        error: (error) => { 
          this.errorDialogService
          .setMessages(['Erro ao tentar carregar beneficiários'])
          .show()
         }
      })
  }

  onDeleteBeneficiario(id: string, index: number) {
    this.confirmActioncService
      .setTitle('Confirma a exclusão do beneficiário?')
      .setOnConfirm(this.deleteBeneficiario.bind(this, id, index))
      .show()
  }

  onEditBeneficiario(id: string) {
    this.router.navigate(['/beneficiario/editar'], {queryParams: {'id': id}})
  }

  onSelectStatus(event: Event) {
    const select = event.target as HTMLSelectElement

    this.filter.status.inUse = !(select.value === "")
    this.filter.status.value = select.value as ('ATIVO' | 'INATIVO' | '')
    
    this.applyFilter()
  }

  onSelectPlano(event: Event) {
    const select = event.target as HTMLSelectElement

    this.filter.plano.inUse = !(select.value === "")
    this.filter.plano.id = select.value

    this.applyFilter()
  }

  private deleteBeneficiario(id: string, index: number) {
    this.http.delete(id)
    .subscribe({
      next: (value: any) => {
        this.beneficiarios.splice(index, 1)
        this.cd.detectChanges()
        this.successDialogService
          .setMessage('Beneficiário removido com sucesso')
          .show()
      },
      error: (error) => { 
        this.errorDialogService
          .setMessages(['Erro ao tentar remover beneficiário'])
          .show()
       }
    })
  }

  private buildDataForTable(data: InBeneficiario[]) {
    this.beneficiarios = data.map(b => new Beneficiario(
      b.nome_completo,
      b.cpf,
      new Date(b.data_nascimento),
      b.status,
      new Plano(b.plano.id!, b.plano.nome, b.plano.codigo_registro_ans),
      b.data_cadastro,
      b.id.toString()
    ))
  }

  private buildPlanosDropdown() {
    this.planosHttp.list()
      .subscribe({
        next: (value) => {
          this.planos = value
          this.cd.detectChanges()
        },
        error: (error) => { 
          this.planos = []
         }
      })
  }

  private applyFilter() {
    this.http.getBeneficiarios_WithFilter(this.buildFilter())
      .subscribe({
        next: (value) => {
          this.buildDataForTable(value)
          this.cd.detectChanges()
        },
        error: (error) => { 
          this.errorDialogService
          .setMessages(['Erro ao tentar carregar beneficiários'])
          .show()
         }
      })
  }

  private buildFilter() {
    let filter: string = ''

    if(this.filter.plano.inUse && this.filter.status.inUse) {
      filter = `&status=${this.filter.status.value}&planoId=${this.filter.plano.id}`
    }
    else if(this.filter.plano.inUse) {
      filter = `&planoId=${this.filter.plano.id}`
    }
    else if(this.filter.status.inUse) {
      filter = `&status=${this.filter.status.value}`
    }

    return filter
  }
}
