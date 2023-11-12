
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './../services/login.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private login:LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    //add the jwt token in request
    let authReq = request;
    const token = this.login.getToken();
    if(token != null){
      // authReq = authReq.clone({
      //   setHeaders: {Authorization:"Bearer "+token}
      authReq = authReq.clone({
        headers: authReq.headers.set('Authorization', `Bearer ${token}`)
      });
      // })
    }
    return next.handle(authReq);
  }
}
export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorInterceptor,
    multi:true,
  },
]
