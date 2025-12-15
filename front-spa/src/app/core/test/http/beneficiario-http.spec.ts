import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { BeneficiarioHttp } from '../../http/beneficiario.http'
import { InBeneficiario } from '../../http/interfaces/beneficiario'

describe('Beneficiário HTTP', () => {
  let http: BeneficiarioHttp
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [HttpClientTestingModule]
      })

    http = TestBed.inject(BeneficiarioHttp)
    httpMock = TestBed.inject(HttpTestingController)
  })

  it('Cenário 1: Verificar rota chamada', () => {
    let routeExpected = 'http://localhost:3000/beneficiarios?_embed=plano'

    http.list().subscribe()
    const req = httpMock.expectOne(routeExpected)
    expect(req.request.method).toBe('GET')

    req.flush([])
  })

  it('Cenário 2: Verificar rota chamada para salvar novo beneficiário', () => {
    let beneficiario: InBeneficiario = {
      cpf: '170228347090',
      data_cadastro: '15/12/2025',
      data_nascimento: '21/05/1996',
      nome_completo: 'Lucas Bernardes',
      id: '3cv4',
      planoId: '2',
      status: 'INATIVO',
      plano: {
        id: '2',
        codigo_registro_ans: 'abc',
        nome: 'Plano Gold'
      }
    }
    let routeExpected = 'http://localhost:3000/beneficiarios'

    http.save(beneficiario).subscribe()
    const req = httpMock.expectOne(routeExpected)
    expect(req.request.method).toBe('POST')

    req.flush([])
  })
})
