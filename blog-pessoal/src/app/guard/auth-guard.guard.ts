import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const token = sessionStorage.getItem('auth-token')

    if (token) {return true}
    else { router.navigate(['login'],  { queryParams: { returnUrl: state.url } }) 
    return false  
  }   
};
