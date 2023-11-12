import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { customEmailValidator, strongPasswordValidator} from './../../services/custom-validators'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;

  loginData = {
    email : "",
    password : ""
  }
  passwordFieldType: string = 'password';
  toggleIconClass: string = 'fa-eye-slash';

  constructor(private snack:MatSnackBar,private login:LoginService, private router:Router, private fb: FormBuilder){

    this.form = this.fb.group({
      email: ['', [Validators.required, customEmailValidator()]],
      password:['', [Validators.required, strongPasswordValidator()]]
    });
  }

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

    if(this.form.valid){
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
            this.router.navigate(['user-dashboard/0'])
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

    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
      this.toggleIconClass = this.passwordFieldType === 'password' ? 'fa-eye-slash' : 'fa-eye';
    }
  
    // $(".toggle-password").click(function() {

    //   $(this).toggleClass("fa-eye fa-eye-slash");
    //   var input = $($(this).attr("toggle"));
    //   if (input.attr("type") == "password") {
    //     input.attr("type", "text");
    //   } else {
    //     input.attr("type", "password");
    //   }
    
}
