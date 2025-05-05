import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { PostService } from '../../../services/Post/post-service.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    postServiceSpy = jasmine.createSpyObj('PostService', ['getPostsByUser']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['error']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar os posts do usuário com sucesso', () => {
    const postsMock = [
      { id: 1, titulo: 'Post A', tema: 'Angular', nome: 'Ana', usuario: 'ana', texto: 'teste', data: '12/04' }
    ];
    postServiceSpy.getPostsByUser.and.returnValue(of(postsMock));

    component.getAllPostUser();

    expect(component.userPosts.length).toBe(1);
    expect(component.userPosts[0].titulo).toBe('Post A');
  });

  it('deve mostrar erro se falhar ao carregar os posts', () => {
    postServiceSpy.getPostsByUser.and.returnValue(throwError(() => new Error()));

    component.getAllPostUser();

    expect(toastrSpy.error).toHaveBeenCalledWith(
      'Erro inesperado ao carregar temas. Tente novamente mais tarde.'
    );
  });

  it('deve redirecionar para rota correta ao chamar mudarPagina()', () => {
    component.mudarPagina('/meuPerfil');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['auth/dashboard/meuPerfil']);
  });
});
