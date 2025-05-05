import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/Auth/login.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar login e redirecionar ao sucesso', () => {
    component.loginform.setValue({ usuario: 'teste', senha: '12345' });
    loginServiceSpy.login.and.returnValue(of());

    component.submit();

    expect(loginServiceSpy.login).toHaveBeenCalledWith('teste', '12345');
    expect(toastrSpy.success).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['auth/dashboard']);
  });

  it('deve mostrar erro ao falhar no login', () => {
    component.loginform.setValue({ usuario: 'teste', senha: '12345' });
    loginServiceSpy.login.and.returnValue(throwError(() => new Error()));

    component.submit();

    expect(toastrSpy.error).toHaveBeenCalled();
  });

  it('deve navegar para a página de cadastro', () => {
    component.navigate();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['signup']);
  });
});
