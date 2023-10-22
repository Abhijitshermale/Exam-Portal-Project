import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  //generate token
  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/auth/login`,loginData);
  }

  //login user set token in local storage
  public loginUser(token){
    localStorage.setItem("token",token);
    return true;
  }

  // isLogin : to check user is loged in or not
  public isuserLogIn(){
    let tokenStr = localStorage.getItem("token")
    if(tokenStr == undefined || tokenStr == "" || tokenStr == null){
      return false;
    }
    else
    {
      return true;
    }
  }

  //logout : remove token from local storage
  public logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //get token
  public getToken(){
    return localStorage.getItem("token");
  }

  // set user details
  public setUser(user){
    localStorage.setItem('user',JSON.stringify(user));
  }

  //get user Details
  public getUser(){
    let userString = localStorage.getItem("user");
    if(userString != null){
      return JSON.parse(userString);
    }else{
      this.logOut();
      return null;
    }
  }

  //get user role
  public getUserRole(){
    let user = this.getUser();
    return user?.authorities[0].authority;
  }
}
