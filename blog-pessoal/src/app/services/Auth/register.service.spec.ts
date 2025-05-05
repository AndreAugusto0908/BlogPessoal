import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RegisterService } from './register.service';
import { API_BASE_URL } from '../../constants/apiUrl';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterService]
    });

    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve enviar requisição POST com os dados corretos', () => {
    const nome = 'Maria';
    const usuario = 'maria123';
    const senha = 'senha123';

    service.register(nome, usuario, senha).subscribe();

    const req = httpMock.expectOne(`${API_BASE_URL}/api/usuarios`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ nome, usuario, senha });

    req.flush({}); // Simula resposta da API
  });
});
