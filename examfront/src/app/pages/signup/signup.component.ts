import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { confirmPasswordValidator, customEmailValidator, phoneNumberValidator, strongPasswordValidator} from './../../services/custom-validators'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {

  form: FormGroup;

  constructor(private userService: UserService, private _snack: MatSnackBar, private route:Router, private fb: FormBuilder) {

    // this.form = this.fb.group({
    //   email: ['', [Validators.required, customEmailValidator()]],
    //   password:['', [Validators.required, strongPasswordValidator()]],
    //   confirmpass:['',[Validators.required]],
    //   firstname:['', [Validators.required]],
    //   lastname:['', [Validators.required]],
    //   phoneno:['',[Validators.required, phoneNumberValidator()]]
    // },
    // {
    //   validators:confirmPasswordValidator('password','confirmpass')
    // }
    // );
    // // // Set validators for confirmPasswordControl
    // const confirmPasswordControl = this.form.get('confirmpass');
    // confirmPasswordControl.setValidators([confirmPasswordValidator('password','confirmpass')]);

    this.form = this.fb.group({
      email: ['', [Validators.required, customEmailValidator()]],
      password: ['', [Validators.required, strongPasswordValidator()]],
      confirmpass: ['', [Validators.required, strongPasswordValidator()]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phoneno: ['', [phoneNumberValidator()]],
    });


  }
  @ViewChild('myForm') myForm: ElementRef;
  passwordFieldType: string = 'password';
  toggleIconClass: string = 'fa-eye-slash';
  passwordFieldType1: string = 'password';
  toggleIconClass1: string = 'fa-eye-slash';
  public user = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  };
  confirmPassword:any;
  userNameHint = '';

  formSubmit() {
    console.log(this.user);
    if (!this.user.email ) {
      // alert("user is required");
      this._snack.open("UserName is required",'',{duration:3000})
      // this.userNameHint = 'UserName is required !!';
      return;
    }
    if(!this.user.password){
      this._snack.open("Password is required",'',{duration:3000})
      return
    }
    if(!this.user.password){
      this._snack.open("Confirm password is required",'',{duration:3000})
      return
    }
    if(this.user.password  && this.confirmPassword){
      if(this.user.password != this.confirmPassword){
        this._snack.open("Password and Confirm password must be same.",'',{duration:3000})
        return
      }
    }
    if(!this.user.firstName){
      this._snack.open("First name is required",'',{duration:3000})
      return
    }
    if(!this.user.lastName){
      this._snack.open("Last name is required",'',{duration:3000})
      return
    }
    // if (this.myForm.nativeElement.valid) {
      //addUser : from UserService
      if(this.form.valid){
        this.userService.addUser(this.user).subscribe(
          (data) => {
            //success
            // alert("User Added Successfully");
            // this._snack.open("User Added Successfully",'',{duration:3000})
            // Swal.fire('Success', 'User is Registered', 'success');
            Swal.fire({
                       text:'User is Registered',
                       confirmButtonText: 'Ok' , 
                       title:"<h1 style='color:black'>Success</h1>",
                       iconColor:'#000',
                       background:'rgba(255, 255, 255, 0.5)',
                       confirmButtonColor: "rgb(255 151 93)",
            }).then((result)=>{
                        if(result.value){
                          this.route.navigate(['login']);
                        }
                       })
          },
          (error) => {
            //error
            // alert("Something Went Wrong");
            this._snack.open('Something Went Wrong', '', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
            });
          }
        );
      }
    // }
  }

  clear(){
    this.user={
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
    };
    this.confirmPassword='';
  }

  togglePasswordVisibility(type) {
    if(type == 'password'){
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
      this.toggleIconClass = this.passwordFieldType === 'password' ? 'fa-eye-slash' : 'fa-eye';
    }else if(type == 'confirm'){
      this.passwordFieldType1 = this.passwordFieldType1 === 'password' ? 'text' : 'password';
      this.toggleIconClass1 = this.passwordFieldType1 === 'password' ? 'fa-eye-slash' : 'fa-eye';
    }
  }

  
  
}


