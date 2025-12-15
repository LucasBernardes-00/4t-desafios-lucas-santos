import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NovoBeneficiario } from '../../../pages/beneficiario/novo-beneficiario/novo-beneficiario'
import { ActivatedRoute, Router } from '@angular/router'
import { of } from 'rxjs'
import { BeneficiarioHttp } from '../../http/beneficiario.http'
import { PlanosHttp } from '../../http/planos.http'
import { SuccessDialogService } from '../../../shared/services/success-dialog.service'
import { ErrorDialogService } from '../../../shared/services/error-dialog.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('Beneficiário Cadastar/Editar', () => {
  let http: BeneficiarioHttp
  let httpMock: HttpTestingController
  let component: NovoBeneficiario
  let fixture: ComponentFixture<NovoBeneficiario>
  let activatedRouteMock = {
    queryParams: of({})
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovoBeneficiario, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
        { provide: BeneficiarioHttp },
        { provide: PlanosHttp },
        { provide: SuccessDialogService },
        { provide: ErrorDialogService },
      ]
    }).compileComponents()

    http = TestBed.inject(BeneficiarioHttp)
    httpMock = TestBed.inject(HttpTestingController)

    fixture = TestBed.createComponent(NovoBeneficiario)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Cenário 1: Ao carregar componente, NovoBeneficiario, o form inicia inválido?', () => {
    expect(component._form.valid).toBeFalse()
  })

  it('Cenário 2: Ao preencher o campo, nome, o formulário ainda está inválido?', () => {
    component._form.controls.nome_completo.setValue('Lucas Bernardes dos Santos')

    expect(component._form.valid).toBeFalse()
  })

  it('Cenário 3: Verificar se rota não é chamada, ao tentar salvar beneficiário com o formulário inválido', async () => {
    spyOn(http, 'save').and.callThrough()

    component._form.controls.nome_completo.setValue('Lucas Bernardes dos Santos')

    await component.onSave()

    expect(http.save).not.toHaveBeenCalled()
  })

  it('Cenário 4: Verificar se rota, salvar beneficiário, é chamada com o formulário válido', async () => {
      spyOn(http, 'getByCPF').and.resolveTo([])

      component._form.setValue({
        nome_completo: 'Lucas Bernardes dos Santos',
        cpf: '12345678900',
        data_nascimento: '2000-01-01',
        status: 'ATIVO',
        planoId: '1',
        data_cadastro: '2024-01-01'
      })

      await component.onSave()

      const req = httpMock.expectOne('http://localhost:3000/beneficiarios')
      expect(req.request.method).toBe('POST')
      req.flush({})
  })
})
