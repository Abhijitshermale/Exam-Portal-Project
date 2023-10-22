import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const login = inject (LoginService) ; 
  const router = inject(Router);

  if(!login.isuserLogIn()){
    return true;
  }
  router.navigate(['']);

  return false;
};
