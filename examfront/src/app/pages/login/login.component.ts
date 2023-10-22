import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    email : "",
    password : ""
  }

  constructor(private snack:MatSnackBar,private login:LoginService, private router:Router){}

  formSubmit(){
    console.log("login button clicked");
    if(!this.loginData.email ){
      this.snack.open("Username is required !!", '',{duration:3000,} );
      return;
    } 
    if(!this.loginData.password){
      this.snack.open("Password is required !!", '',{duration:3000,} );
      return;
    }
      //request to server to generate the token
    this.login.generateToken(this.loginData).subscribe((data:any) =>{
        console.log("login data success");
        console.log(data);

        //login
        this.login.loginUser(data.jwtToken);
        console.log('data.token: ', data.jwtToken);
        this.login.setUser(data.user);
        console.log('data.user: ', data.user);
        if(this.login.getUserRole() == "ADMIN"){
          //for admin dashboard 
          this.router.navigate(['admin'])
          this.login.loginStatusSubject.next(true);
        }else if(this.login.getUserRole() == "NORMAL"){
          // for user dashboard
          this.router.navigate(['user-dashboard'])
          this.login.loginStatusSubject.next(true);
        }else{
          this.login.logOut();
        }
      },
      (error)=>{
        console.log("login data success");
        console.log(error);
        this.snack.open("Invalid Details !! try again", '',{duration:3000,} );
      }
      );

      
    }
  

}
