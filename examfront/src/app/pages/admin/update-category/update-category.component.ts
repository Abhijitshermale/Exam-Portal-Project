import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {

  constructor(private _snack:MatSnackBar, private _route:ActivatedRoute, private _category:CategoryService,  private router:Router){}
  cid = 0;
  category;
  ngOnInit(): void {
    this.cid = this._route.snapshot.params.cid;

    this._category.getCategory(this.cid).subscribe(
      (data)=>{
        this.category = data;
        console.log('this.quiz: ', this.category);
      },
      (error)=>{
        console.log(error);
      }
    );
    
  }

  formSubmit(){
    console.log("this.quiz for update:"+this.category);
    if(!this.category.title ){
      this._snack.open("Title Required !!",'',{duration:3000});
      return;
    }
    if(!this.category.description){
      this._snack.open("Description Required !!",'',{duration:3000});
        return;
    }
    
    this._category.updateCategory(this.category).subscribe((data) =>{
      this.category.title='';
      this.category.description='';
     
      // Swal.fire('Succes !!',"Quiz updated Successfully.",'success')
      Swal.fire(
        {icon:'error',
            confirmButtonText:'OK',
            title:"<h1 style='color:black'>Category updated Successfully.</h1>",
          iconColor:'#000',
          background:'rgba(255, 255, 255, 0.8)',
          confirmButtonColor: "rgb(255 151 93)",
        })
      .then(
        (data)=>{
          this.router.navigate(["/admin/categories"])
        }
      )
    },
    (error)=>{
      console.log(error);
      // Swal.fire('Error !!',"Server error.",'error')
      Swal.fire(
        {icon:'error',
            confirmButtonText:'OK',
            title:"<h1 style='color:black'>Server error.</h1>",
          iconColor:'#000',
          background:'rgba(255, 255, 255, 0.8)',
          confirmButtonColor: "rgb(255 151 93)",
        })
    }
    )

  }


}
