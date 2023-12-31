import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper/helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http:HttpClient) { }

  //add User
  public addUser(user:any){
    return this.http.post(`${baseUrl}/auth/`,user)
  }
}
