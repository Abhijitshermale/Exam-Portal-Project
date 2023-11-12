import { LoginService } from './../services/login.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';



export const adminGuard: CanActivateFn = (route, state) => {
  const login = inject (LoginService) ; 
  const router = inject(Router);
  const tokenexpired = login.tokenExpired()

  if(login.isUserLoggedIn() && login.getUserRole()=="ADMIN" ){
    return true;
  }
  login.logOut();
  router.navigate(['']);

  return false;
};
