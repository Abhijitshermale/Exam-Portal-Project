import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLoggedIn = false;
  user = null;
  constructor(public login:LoginService,private route: ActivatedRoute,private router: Router){
    this.isLoggedIn = login.isUserLoggedIn();
    this.user = login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data) =>{
      this.isLoggedIn = login.isUserLoggedIn();
      this.user = login.getUser();
    });
  }

  logOutUser(){
    this.login.logOut();
    window.location.reload();
    // this.login.loginStatusSubject.next(false);
  }
  redirectHome(){
    let isAdminPresent = this.route.snapshot['_routerState'].url;
    if(isAdminPresent.includes('admin')){
      this.router.navigate(['admin'])
    }else{
      this.router.navigate(['/user-dashboard/0']);
    }
  }
}
