import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostService } from './post-service.service';
import { API_BASE_URL } from '../../constants/apiUrl';
import { PostResponse } from '../../types/post-resonse.type';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  const fakeToken = 'fake-token';
  const fakeUser = 'maria123';
  const fakeId = '10';

  beforeEach(() => {
    // Simula dados no sessionStorage
    sessionStorage.setItem('auth-token', fakeToken);
    sessionStorage.setItem('username', fakeUser);
    sessionStorage.setItem('id', fakeId);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });

    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    sessionStorage.clear();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve criar nova postagem', () => {
    const postMock: PostResponse = { id: 1, titulo: 'Post A', tema: 'Angular', nome: 'Ana', usuario: 'ana', texto: 'teste', data: '12/04' }

    service.newPost('Título', 'Tema', 'Texto').subscribe(res => {
      expect(res).toEqual(postMock);
    });

    const req = httpMock.expectOne(`${API_BASE_URL}/api/postagens`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${fakeToken}`);
    expect(req.request.body.usuario).toBe(fakeUser);

    req.flush(postMock);
  });

  it('deve buscar postagens do usuário', () => {
    service.getPostsByUser().subscribe();

    const req = httpMock.expectOne(`${API_BASE_URL}/api/postagens/filtro`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('autor')).toBe(fakeId);
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${fakeToken}`);

    req.flush([]);
  });

  it('deve buscar todas as postagens', () => {
    service.getAllPosts().subscribe();

    const req = httpMock.expectOne(`${API_BASE_URL}/api/postagens`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${fakeToken}`);

    req.flush([]);
  });

  it('deve excluir uma postagem', () => {
    const id = 5;

    service.delete(id).subscribe();

    const req = httpMock.expectOne(`${API_BASE_URL}/api/postagens/${id}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${fakeToken}`);

    req.flush({});
  });

  it('deve editar uma postagem', () => {
    const id = 2;
    service.editar(id, 'Novo Título', 'Novo Tema', 'Novo Texto').subscribe();

    const req = httpMock.expectOne(`${API_BASE_URL}/api/postagens/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.titulo).toBe('Novo Título');
    expect(req.request.body.tema).toBe('Novo Tema');
    expect(req.request.body.texto).toBe('Novo Texto');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${fakeToken}`);

    req.flush({});
  });
});
