import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from '../Auth/login.service';
import { API_BASE_URL } from '../../constants/apiUrl';
import { LoginResponse } from '../../types/login-responde.type';
import { jwtDecode } from 'jwt-decode';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  const mockToken = 'fake-token';
  const mockDecoded = {
    nome: 'João',
    usuario: 'joao123',
    id: 10,
    exp: 9999999999,
    sub: 'joao123',
    iss: 'api'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
    sessionStorage.clear();

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve fazer login e armazenar token e dados decodificados no sessionStorage', () => {
    const mockResponse: LoginResponse = { token: mockToken };

    service.login('joao123', 'senha123').subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(sessionStorage.getItem('auth-token')).toBe(mockToken);
      expect(sessionStorage.getItem('username')).toBe(mockDecoded.usuario);
      expect(sessionStorage.getItem('nome')).toBe(mockDecoded.nome);
      expect(sessionStorage.getItem('id')).toBe(mockDecoded.id.toString());
    });

    const req = httpMock.expectOne(`${API_BASE_URL}/api/usuarios/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ usuario: 'joao123', senha: 'senha123' });

    req.flush(mockResponse);
  });
});
