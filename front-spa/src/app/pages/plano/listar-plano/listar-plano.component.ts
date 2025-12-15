import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { InPlano } from '../../../core/http/interfaces/planos'
import { PlanosHttp } from '../../../core/http/planos.http'
import { Plano } from '../../../core/models/plano'
import { ErrorDialogService } from '../../../shared/services/error-dialog.service'
import { ConfirmActionService } from '../../../shared/services/modal-confirmation.service'
import { SuccessDialogService } from '../../../shared/services/success-dialog.service'
import { BeneficiarioHttp } from '../../../core/http/beneficiario.http'

@Component({
  selector: 'app-listar-plano.component',
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-plano.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListarPlanoComponent implements OnInit { 
  planos: Plano[] = []

  private cd = inject(ChangeDetectorRef)
  private router = inject(Router)

  private http = inject(PlanosHttp)
  private beneficiarioHttp = inject(BeneficiarioHttp)

  private confirmActioncService = inject(ConfirmActionService)
  private successDialogService = inject(SuccessDialogService)
  private errorDialogService = inject(ErrorDialogService)

  ngOnInit(): void {
    this.searchPlanos()
  }

  onEditPlano(id: string) { 
    this.router.navigate(['/plano/editar'], {queryParams: {'id': id}})
  }

  async onDeletePlano(id: string, index: number) {
    this.confirmActioncService
      .setTitle('Confirma a exclusão do plano?')
      .setOnConfirm(this.deletePlano.bind(this, id, index))
      .show()
  }

  private searchPlanos() {
    this.http.list()
      .subscribe({
        next: (value) => {
          this.buildDataForTable(value)
          this.cd.detectChanges()
        },
        error: (error) => { 
          this.errorDialogService
          .setMessages(['Erro ao tentar carregar plano'])
          .show()
         }
      })
  }

  private buildDataForTable(data: InPlano[]) {
    this.planos = data.map(p => new Plano(
      p.id!,
      p.nome,
      p.codigo_registro_ans
    ))
  }

  private async validateDelete(index: number) {
    let result = await this.beneficiarioHttp.getByPlano(this.planos[index].Id)

    if (result && result.length > 0) return false
    return true
  }

  private async deletePlano(id: string, index: number) {
    if (!await this.validateDelete(index)) {
      this.errorDialogService
          .setMessages([`Não é possível apagar este plano, pois existe pelo menos um beneficiário cadastrado nele.`])
          .show()
      return
    }

    this.http.delete(id)
    .subscribe({
      next: (value: any) => {
        this.planos.splice(index, 1)
        this.cd.detectChanges()
        this.successDialogService
          .setMessage('Plano removido com sucesso')
          .show()
      },
      error: (error) => { 
        this.errorDialogService
          .setMessages(['Erro ao tentar remover plano'])
          .show()
       }
    })
  }
}
