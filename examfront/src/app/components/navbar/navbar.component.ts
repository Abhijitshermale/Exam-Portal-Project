import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLoggedIn = false;
  user = null;
  constructor(public login:LoginService){
    this.isLoggedIn = login.isuserLogIn();
    this.user = login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data) =>{
      this.isLoggedIn = login.isuserLogIn();
      this.user = login.getUser();
    });
  }

  logOutUser(){
    this.login.logOut();
    window.location.reload();
    // this.login.loginStatusSubject.next(false);
  }
}
