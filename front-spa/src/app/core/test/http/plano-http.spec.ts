import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { InPlano } from '../../http/interfaces/planos'
import { PlanosHttp } from '../../http/planos.http'

describe('Plano HTTP', () => {
  let http: PlanosHttp
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [HttpClientTestingModule]
      })

    http = TestBed.inject(PlanosHttp)
    httpMock = TestBed.inject(HttpTestingController)
  })

  it('Cenário 1: Verificar rota chamada', () => {
    let routeExpected = 'http://localhost:3000/planos'

    http.list().subscribe()
    const req = httpMock.expectOne(routeExpected)
    expect(req.request.method).toBe('GET')

    req.flush([])
  })

  it('Cenário 2: Verificar rota chamada para salvar novo plano', () => {
    let plano: InPlano = {
      nome: 'Plano Iridium',
      codigo_registro_ans: '40028922'
    }
    let routeExpected = 'http://localhost:3000/planos'

    http.save(plano).subscribe()
    const req = httpMock.expectOne(routeExpected)
    expect(req.request.method).toBe('POST')

    req.flush([])
  })
})
