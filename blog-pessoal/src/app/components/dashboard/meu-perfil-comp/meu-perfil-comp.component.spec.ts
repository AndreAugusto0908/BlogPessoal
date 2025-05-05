import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeuPerfilCompComponent } from './meu-perfil-comp.component';
import { PostService } from '../../../services/Post/post-service.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

describe('MeuPerfilCompComponent', () => {
  let component: MeuPerfilCompComponent;
  let fixture: ComponentFixture<MeuPerfilCompComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>;
  let toastSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    postServiceSpy = jasmine.createSpyObj('PostService', ['getPostsByUser', 'delete']);
    toastSpy = jasmine.createSpyObj('ToastrService', ['error', 'success']);

    await TestBed.configureTestingModule({
      imports: [MeuPerfilCompComponent],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: ToastrService, useValue: toastSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MeuPerfilCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar os posts do usuário', () => {
    const mockPosts = [{ id: 1, titulo: 'Post', tema: 'Angular', nome: 'João', usuario: 'joao', texto: 'teste', data: '12/04' }];
    postServiceSpy.getPostsByUser.and.returnValue(of(mockPosts));

    component.getAllPostUser();

    expect(component.userPosts.length).toBe(1);
    expect(component.userPosts[0].titulo).toBe('Post');
  });

  it('deve mostrar erro se falhar ao carregar os posts', () => {
    postServiceSpy.getPostsByUser.and.returnValue(throwError(() => new Error()));
    component.getAllPostUser();

    expect(toastSpy.error).toHaveBeenCalled();
  });

  it('deve deletar um post e atualizar a lista', () => {
    const mockPosts = [
      { id: 1, titulo: 'Post 1', tema: 'Angular', nome: 'João', usuario: 'joao', texto: 'teste', data: '12/04' },
      { id: 2, titulo: 'Post 2', tema: 'React', nome: 'Maria', usuario: 'maria', texto: 'teste', data: '12/04' }
    ];
    component.userPosts = mockPosts;
    postServiceSpy.delete.and.returnValue(of({}));

    component.deletePost(1);

    expect(component.userPosts.length).toBe(1);
    expect(component.userPosts[0].id).toBe(2);
    expect(toastSpy.success).toHaveBeenCalled();
  });

  it('deve emitir erro ao falhar na exclusão do post', () => {
    postServiceSpy.delete.and.returnValue(throwError(() => new Error()));
    component.userPosts = [{ id: 1, titulo: 'Post', tema: 'Vue', nome: 'Ana', usuario: 'ana', texto: 'teste', data: '12/04' }];

    component.deletePost(1);

    expect(toastSpy.error).toHaveBeenCalled();
  });

  it('deve alternar o formulário e definir o post selecionado', () => {
    const mockPost = { id: 99, titulo: 'Post X', tema: 'Node', nome: 'Pedro', usuario: 'pedro', texto: 'teste', data: '12/04' };
    component.onFormularioClick(mockPost);

    expect(component.mostrarFormulario).toBeTrue();
    expect(component.postSelecionado).toEqual(mockPost);
  });
});
