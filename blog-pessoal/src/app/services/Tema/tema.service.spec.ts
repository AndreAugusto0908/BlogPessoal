import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TemaService } from './tema.service';
import { API_BASE_URL } from '../../constants/apiUrl';
import { TemaResponse } from '../../types/tema-response.type';

describe('TemaService', () => {
  let service: TemaService;
  let httpMock: HttpTestingController;

  const fakeToken = 'fake-auth-token';

  beforeEach(() => {
    // Simula token no sessionStorage
    sessionStorage.setItem('auth-token', fakeToken);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TemaService]
    });

    service = TestBed.inject(TemaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    sessionStorage.clear();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve buscar todos os temas com header de autenticação', () => {
    const mockTemas: TemaResponse[] = [
      { id: 1, descricao: 'Educação' },
      { id: 2, descricao: 'Saúde' }
    ];

    service.getAllTemas().subscribe(response => {
      expect(response).toEqual(mockTemas);
    });

    const req = httpMock.expectOne(`${API_BASE_URL}/api/temas`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${fakeToken}`);

    req.flush(mockTemas);
  });
});
