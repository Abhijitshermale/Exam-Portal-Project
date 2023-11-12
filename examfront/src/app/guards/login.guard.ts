import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './../services/login.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const login = inject (LoginService) ; 
  const router = inject(Router);

  if(!login.isUserLoggedIn()){
    return true;
  }
  else if ( !login.tokenExpired()){
    if(login.getUserRole()=="NORMAL"){
  
      router.navigate(['user-dashboard/0'])
    }else if(login.getUserRole()=="ADMIN"){
      router.navigate(['admin'])
    }
  }else{
    login.logOut();
  }
  
  

  return false;
};
