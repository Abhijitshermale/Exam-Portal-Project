import { Router } from '@angular/router';
import  Swal  from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from './../../../services/category.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  category = {
    title:'',
    description:''
  }

  constructor(private _category:CategoryService, private _snack:MatSnackBar, private _router:Router ){}

  formSubmit(){ 
    if(!this.category.title ){
      this._snack.open("Title Required !!",'',{duration:3000});
      return;
    }
    if(!this.category.description){
      this._snack.open("Description Required !!",'',{duration:3000});
        return;
    }
    this._category.addCategory(this.category).subscribe((data) =>{
      this.category.title='';
      this.category.description='';
      // Swal.fire('Succes !!',"Category added Successfully.",'success')
      Swal.fire(
        {
          icon:'success',
          confirmButtonText:'OK',
          // showCancelButton:true,
          title:"<h1 style='color:black'>Category added Successfully.</h1>",
        iconColor:'#000',
        background:'rgba(255, 255, 255, 0.8)',
        confirmButtonColor: "rgb(255 151 93)",
        })  
      .then(
        (data)=>{
          // this._router.navigate(["/admin/categories"])
        }
      )
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error !!',"Server error.",'error')
    }
    )
  }
}
