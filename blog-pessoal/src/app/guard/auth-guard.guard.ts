import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Guarda de rota que impede o acesso a rotas protegidas sem autenticação.
 * 
 * - Verifica se existe um token de autenticação no sessionStorage.
 * - Caso o token não exista, redireciona o usuário para a rota de login
 *   e armazena a URL original para redirecionamento após o login.
 * 
 * @param route Informações da rota atual
 * @param state Estado da navegação (contém a URL que está sendo acessada)
 * @returns `true` se o usuário estiver autenticado, `false` caso contrário
 */
export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const token = sessionStorage.getItem('auth-token')

    if (token) {return true}
    else { router.navigate(['login'],  { queryParams: { returnUrl: state.url } }) 
    return false  
  }   
};
