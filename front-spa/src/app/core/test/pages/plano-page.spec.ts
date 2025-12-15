import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NovoPlanoComponent } from '../../../pages/plano/novo-plano/novo-plano.component'
import { ActivatedRoute, Router } from '@angular/router'
import { of } from 'rxjs'
import { BeneficiarioHttp } from '../../http/beneficiario.http'
import { PlanosHttp } from '../../http/planos.http'
import { SuccessDialogService } from '../../../shared/services/success-dialog.service'
import { ErrorDialogService } from '../../../shared/services/error-dialog.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('Plano Cadastar/Editar', () => {
  let http: PlanosHttp
  let httpMock: HttpTestingController
  let component: NovoPlanoComponent
  let fixture: ComponentFixture<NovoPlanoComponent>
  let activatedRouteMock = {
    queryParams: of({})
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovoPlanoComponent, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
        { provide: BeneficiarioHttp },
        { provide: PlanosHttp },
        { provide: SuccessDialogService },
        { provide: ErrorDialogService },
      ]
    }).compileComponents()

    http = TestBed.inject(PlanosHttp)
    httpMock = TestBed.inject(HttpTestingController)

    fixture = TestBed.createComponent(NovoPlanoComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Cenário 1: Ao carregar componente, NovoPlano, o form inicia inválido?', () => {
    expect(component._form.valid).toBeFalse()
  })

  it('Cenário 2: Ao preencher o campo, nome, o formulário ainda está inválido?', () => {
    component._form.controls.nome.setValue('Plano Iridium')

    expect(component._form.valid).toBeFalse()
  })

  it('Cenário 3: Verificar se rota não é chamada, ao tentar cadastar um plano com o formulário inválido', async () => {
    spyOn(http, 'save').and.callThrough()

    component._form.controls.nome.setValue('Plano Iridium')

    await component.onSave()

    expect(http.save).not.toHaveBeenCalled()
  })

  it('Cenário 4: Verificar se rota, cadastrar plano, com um formulário válido', async () => {
      spyOn(http, 'getByRegistroANS').and.resolveTo([])

      component._form.setValue({
        nome: 'Plano Iridium',
        codigo_registro_ans: '40028922'
      })

      await component.onSave()

      const req = httpMock.expectOne('http://localhost:3000/planos')
      expect(req.request.method).toBe('POST')
      req.flush({})
  })
})
