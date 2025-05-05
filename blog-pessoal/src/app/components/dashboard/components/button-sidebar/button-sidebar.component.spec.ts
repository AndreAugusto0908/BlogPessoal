import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonSidebarComponent } from './button-sidebar.component';
import { Router } from '@angular/router';

describe('Componente ButtonSidebarComponent', () => {
  let component: ButtonSidebarComponent;
  let fixture: ComponentFixture<ButtonSidebarComponent>;
  let roteadorFalso: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    roteadorFalso = jasmine.createSpyObj('Router', ['navigate'], {
      url: '/auth/dashboard/home'
    });

    await TestBed.configureTestingModule({
      imports: [ButtonSidebarComponent],
      providers: [{ provide: Router, useValue: roteadorFalso }]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir o evento submit ao chamar sumbit()', () => {
    spyOn(component.onSubmit, 'emit');
    component.sumbit();
    expect(component.onSubmit.emit).toHaveBeenCalled();
  });

  it('deve retornar true se a rota atual for igual à rota do botão', () => {
    component.route = '/home';
    expect(component.isActiveRoute()).toBeTrue();
  });

  it('deve retornar false se a rota atual for diferente da rota do botão', () => {
    component.route = '/outra-rota';
    expect(component.isActiveRoute()).toBeFalse();
  });
});
