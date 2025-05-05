import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGuard } from './auth-guard.guard';

describe('AuthGuard', () => {
  let navigateSpy: jasmine.Spy;
  let mockRouter: Partial<Router>;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => AuthGuard(...guardParameters));

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    });

    sessionStorage.clear(); // limpa antes de cada teste
  });

  it('deve permitir acesso se o token estiver presente', () => {
    sessionStorage.setItem('auth-token', 'token-valido');

    const result = executeGuard({} as any, { url: '/rota-protegida' } as any);

    expect(result).toBeTrue();
  });

  it('deve redirecionar para login se o token estiver ausente', () => {
    const state = { url: '/rota-restrita' };
    const result = executeGuard({} as any, state as any);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['login'], {
      queryParams: { returnUrl: '/rota-restrita' }
    });
    expect(result).toBeFalse();
  });
});
