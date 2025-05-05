import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';
import { NewPostComponent } from '../../forms/new-post/new-post.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let roteadorFalso: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    roteadorFalso = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [NavbarComponent, NewPostComponent],
      providers: [{ provide: Router, useValue: roteadorFalso }]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve alternar o formulário ao clicar', () => {
    expect(component.mostrarFormulario).toBeFalse();
    component.onFormularioClick();
    expect(component.mostrarFormulario).toBeTrue();
    component.onFormularioClick();
    expect(component.mostrarFormulario).toBeFalse();
  });

  it('deve navegar para home', () => {
    component.irParaHome();
    expect(roteadorFalso.navigate).toHaveBeenCalledWith(['/auth/dashboard']);
  });

  it('deve navegar para meu perfil', () => {
    component.irParaPerfil();
    expect(roteadorFalso.navigate).toHaveBeenCalledWith(['/auth/dashboard/meuPerfil']);
  });

  it('deve navegar para estatísticas', () => {
    component.irParaEstatisticas();
    expect(roteadorFalso.navigate).toHaveBeenCalledWith(['/auth/dashboard/stats']);
  });
});