import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, timer, Subscription } from 'rxjs';
import baseUrl from '../helper/helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();
  private tokenExpirationTimer: Subscription;

  constructor(private http: HttpClient, private router: Router) {
    this.initTokenExpirationTimer();
  }

  private initTokenExpirationTimer(): void {
    this.tokenExpirationTimer = timer(0, 1000).subscribe(() => {
      if (this.tokenExpired()) {
        this.logOut();
      }
    });
  }

  public tokenExpired(): boolean {
    let token = this.getToken();
    if (token) {
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      return Math.floor(new Date().getTime() / 1000) >= expiry;
    }
    return false;
  }

  // generate token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/auth/login`, loginData);
  }

  // login user set token in local storage
  public loginUser(token) {
    localStorage.setItem("token", token);
    this.initTokenExpirationTimer(); // Restart the timer on login
    return true;
  }

  // isLogin : to check if the user is logged in or not
  public isUserLoggedIn() {
    let tokenStr = localStorage.getItem("token");
    return tokenStr !== undefined && tokenStr !== "" && tokenStr !== null;
  }

  // logout : remove token from local storage
  public logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (this.tokenExpirationTimer) {
      this.tokenExpirationTimer.unsubscribe(); // Unsubscribe from the timer
    }
    this.router.navigate(['']);
    return true;
  }

  // get token
  public getToken() {
    return localStorage.getItem("token");
  }

  // set user details
  public setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // get user Details
  public getUser() {
    let userString = localStorage.getItem("user");
    if (userString != null) {
      return JSON.parse(userString);
    } else {
      this.logOut();
      return null;
    }
  }

  // get user role
  public getUserRole() {
    let user = this.getUser();
    return user?.authorities[0].authority;
  }
}
