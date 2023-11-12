import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './../services/login.service';

export const normalGuard: CanActivateFn = (route, state) => {
  const login = inject (LoginService) ; 
  const router = inject(Router);

  if(login.isUserLoggedIn() && login.getUserRole()=="NORMAL"){
    return true;
  }
  login.logOut();
  router.navigate(['']);

  return false;
};
