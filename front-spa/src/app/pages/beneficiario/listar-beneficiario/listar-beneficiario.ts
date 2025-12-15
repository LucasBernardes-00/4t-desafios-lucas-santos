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

@Component({
  selector: 'app-listar-beneficiario',
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-beneficiario.html'
})
export class ListarBeneficiario implements OnInit {
  beneficiarios: Beneficiario[] = []

  private http = inject(BeneficiarioHttp)
  private cd = inject(ChangeDetectorRef)
  private router = inject(Router)

  private confirmActioncService = inject(ConfirmActionService)
  private successDialogService = inject(SuccessDialogService)
  private errorDialogService = inject(ErrorDialogService)

  constructor() { }

  ngOnInit(): void {
    this.searchBeneficiarios()
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
      new Plano(b.plano.id, b.plano.nome, b.plano.codigo_registro_ans),
      b.data_cadastro,
      b.id.toString()
    ))
  }
}
