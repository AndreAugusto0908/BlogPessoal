import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedComponent } from './feed.component';
import { PostService } from '../../../services/Post/post-service.service';
import { TemaService } from '../../../services/Tema/tema.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>;
  let temaServiceSpy: jasmine.SpyObj<TemaService>;
  let toastServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    postServiceSpy = jasmine.createSpyObj('PostService', ['getAllPosts']);
    temaServiceSpy = jasmine.createSpyObj('TemaService', ['getAllTemas']);
    toastServiceSpy = jasmine.createSpyObj('ToastrService', ['error']);

    await TestBed.configureTestingModule({
      imports: [FeedComponent],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: TemaService, useValue: temaServiceSpy },
        { provide: ToastrService, useValue: toastServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar posts com sucesso', () => {
    const mockPosts = [{ id: 1, titulo: 'Post', tema: 'Angular', nome: 'João', usuario: 'joao', texto: 'teste', data: '12/04' }];
    postServiceSpy.getAllPosts.and.returnValue(of(mockPosts));

    component.getAllPost();

    expect(component.allPosts.length).toBe(1);
    expect(component.postsFiltrados.length).toBe(1);
  });

  it('deve mostrar erro se falhar ao carregar posts', () => {
    postServiceSpy.getAllPosts.and.returnValue(throwError(() => new Error()));
    component.getAllPost();
    expect(toastServiceSpy.error).toHaveBeenCalled();
  });

  it('deve filtrar os posts corretamente por tema', () => {
    component.allPosts = [
      { id: 1, titulo: 'Post 1', tema: 'Angular', nome: 'João', usuario: 'joao', texto: 'teste', data: '12/04' },
      { id: 2, titulo: 'Post 2', tema: 'React', nome: 'Maria', usuario: 'maria', texto: 'teste', data: '12/04' }
    ];

    component.filtrarPosts('Angular');
    expect(component.postsFiltrados.length).toBe(1);
    expect(component.postsFiltrados[0].tema).toBe('Angular');
  });

  it('deve retornar todos os posts se nenhum tema for selecionado', () => {
    component.allPosts = [
      { id: 1, titulo: 'Post 1', tema: 'Angular', nome: 'João', usuario: 'joao', texto: 'teste', data: '12/04' },
      { id: 2, titulo: 'Post 2', tema: 'React', nome: 'Maria', usuario: 'maria', texto: 'teste', data: '12/04' }
    ];

    component.filtrarPosts('');
    expect(component.postsFiltrados.length).toBe(2);
  });
});
