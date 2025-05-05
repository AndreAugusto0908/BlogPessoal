import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/Auth/register.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let registerServiceSpy: jasmine.SpyObj<RegisterService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    registerServiceSpy = jasmine.createSpyObj('RegisterService', ['register']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [SignupComponent],
      providers: [
        { provide: RegisterService, useValue: registerServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar register e exibir sucesso', () => {
    component.signupForm.setValue({ nome: 'João', usuario: 'joao123', senha: '12345' });
    registerServiceSpy.register.and.returnValue(of());

    component.submit();

    expect(registerServiceSpy.register).toHaveBeenCalledWith('João', 'joao123', '12345');
    expect(toastrSpy.success).toHaveBeenCalledWith('Registro feito com sucesso');
  });

  it('deve mostrar erro ao falhar no registro', () => {
    component.signupForm.setValue({ nome: 'Maria', usuario: 'maria123', senha: '54321' });
    registerServiceSpy.register.and.returnValue(throwError(() => new Error()));

    component.submit();

    expect(toastrSpy.error).toHaveBeenCalledWith('Erro inesperado, tente novamente mais tarde');
  });

  it('deve navegar para a tela de login', () => {
    component.navigate();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
  });
});
