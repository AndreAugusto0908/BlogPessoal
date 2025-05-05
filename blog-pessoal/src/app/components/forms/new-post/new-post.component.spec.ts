import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewPostComponent } from './new-post.component';
import { PostService } from '../../../services/Post/post-service.service';
import { TemaService } from '../../../services/Tema/tema.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

describe('NewPostComponent', () => {
  let component: NewPostComponent;
  let fixture: ComponentFixture<NewPostComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>;
  let temaServiceSpy: jasmine.SpyObj<TemaService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    postServiceSpy = jasmine.createSpyObj('PostService', ['newPost']);
    temaServiceSpy = jasmine.createSpyObj('TemaService', ['getAllTemas']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [NewPostComponent],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: TemaService, useValue: temaServiceSpy },
        { provide: ToastrService, useValue: toastrSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar temas com sucesso', () => {
    const mockTemas = [{ id: 1, descricao: 'Angular' }];
    temaServiceSpy.getAllTemas.and.returnValue(of(mockTemas));

    component.getNameTema();

    expect(component.temas.length).toBe(1);
    expect(component.temas[0].descricao).toBe('Angular');
  });

  it('deve mostrar erro se falhar ao carregar temas', () => {
    temaServiceSpy.getAllTemas.and.returnValue(throwError(() => new Error()));

    component.getNameTema();

    expect(toastrSpy.error).toHaveBeenCalled();
  });

  it('deve enviar o formulário com sucesso', () => {
    spyOn(component.closeForm, 'emit');
    postServiceSpy.newPost.and.returnValue(of());

    component.postForm.setValue({
      titulo: 'Novo Post',
      tema: 'Angular',
      texto: 'Conteúdo do post'
    });

    component.submit();

    expect(postServiceSpy.newPost).toHaveBeenCalled();
    expect(toastrSpy.success).toHaveBeenCalled();
    expect(component.closeForm.emit).toHaveBeenCalled();
  });

  it('deve mostrar erro se falhar ao enviar o post', () => {
    postServiceSpy.newPost.and.returnValue(throwError(() => new Error()));

    component.postForm.setValue({
      titulo: 'Erro',
      tema: 'Falha',
      texto: 'Teste'
    });

    component.submit();

    expect(toastrSpy.error).toHaveBeenCalled();
  });
});
