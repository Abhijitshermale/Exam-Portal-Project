import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private userService: UserService, private _snack: MatSnackBar, private route:Router) {}

  public user = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  };
  userNameHint = '';
  formSubmit() {
    console.log(this.user);
    if (this.user.email == '' || this.user.email == null) {
      // alert("user is required");
      // this._snack.open("UserName is required",'',{duration:3000})
      this.userNameHint = 'UserName is required !!';
      return;
    } else {
      this.userNameHint = '';
    }

    //addUser : from UserService
    this.userService.addUser(this.user).subscribe(
      (data) => {
        //success
        // alert("User Added Successfully");
        // this._snack.open("User Added Successfully",'',{duration:3000})
        // Swal.fire('Success', 'User is Registered', 'success');
        Swal.fire({title:'Success',
                   text:'User is Registered',
                   confirmButtonText: 'Ok'  }).then((result)=>{
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
}
