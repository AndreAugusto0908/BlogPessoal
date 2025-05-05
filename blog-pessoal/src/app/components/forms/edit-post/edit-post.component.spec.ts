import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPostComponent } from './edit-post.component';
import { PostService } from '../../../services/Post/post-service.service';
import { TemaService } from '../../../services/Tema/tema.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

describe('EditPostComponent', () => {
  let component: EditPostComponent;
  let fixture: ComponentFixture<EditPostComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>;
  let temaServiceSpy: jasmine.SpyObj<TemaService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    postServiceSpy = jasmine.createSpyObj('PostService', ['editar']);
    temaServiceSpy = jasmine.createSpyObj('TemaService', ['getAllTemas']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [EditPostComponent],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: TemaService, useValue: temaServiceSpy },
        { provide: ToastrService, useValue: toastrSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPostComponent);
    component = fixture.componentInstance;
    component.post = {
      id: 1,
      titulo: 'Título de Teste',
      tema: 'Angular',
      texto: 'Conteúdo do post',
      nome: 'Usuário',
      usuario: 'usuario1',
      data: '2024-05-01'
    };
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve preencher o formulário com dados do post recebido', () => {
    expect(component.editForm.value.titulo).toBe('Título de Teste');
    expect(component.editForm.value.tema).toBe('Angular');
    expect(component.editForm.value.texto).toBe('Conteúdo do post');
  });

  it('deve emitir closeForm e mostrar sucesso ao submeter', () => {
    spyOn(component.closeForm, 'emit');
    postServiceSpy.editar.and.returnValue(of({}));

    component.submit();

    expect(postServiceSpy.editar).toHaveBeenCalled();
    expect(toastrSpy.success).toHaveBeenCalled();
    expect(component.closeForm.emit).toHaveBeenCalled();
  });

  it('deve emitir closeForm e mostrar erro ao falhar na submissão', () => {
    spyOn(component.closeForm, 'emit');
    postServiceSpy.editar.and.returnValue(throwError(() => new Error()));

    component.submit();

    expect(toastrSpy.error).toHaveBeenCalled();
    expect(component.closeForm.emit).toHaveBeenCalled();
  });
});
