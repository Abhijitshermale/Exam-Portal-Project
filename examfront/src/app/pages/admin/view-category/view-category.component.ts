import Swal from 'sweetalert2';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  categories = [
  ]

  constructor(private _category:CategoryService){}

  ngOnInit(): void {
    this._category.getCategories().subscribe((data:any)=>{
        this.categories = data;
        console.log('this.categories: ', this.categories);

    },
    (error)=>{
      console.log(error);
      Swal.fire('Error !!',"Error in loading data.","error");
    }
    );
  }

  deleteCategory(cid){
    Swal.fire(
      {
        icon:'info',
          confirmButtonText:'Delete',
          showCancelButton:true,
          title:"<h1 style='color:black'>Are you Sure ?</h1>",
        iconColor:'#000',
        background:'rgba(255, 255, 255, 0.8)',
        confirmButtonColor: "rgb(255 151 93)",
      }
    ).then((result)=>{
      if(result.isConfirmed){
        this._category.deleteCategory(cid).subscribe((data)=>{
          this.categories = this.categories.filter((cat)=>cat.cid != cid)
          // Swal.fire('Success','Quiz Deleted','success');
          Swal.fire(
            {icon:'success',
                confirmButtonText:'OK',
                title:"<h1 style='color:black'>Category Deleted</h1>",
              iconColor:'#000',
              background:'rgba(255, 255, 255, 0.8)',
              confirmButtonColor: "rgb(255 151 93)",
            })
        }),
        (error)=>{
          // Swal.fire('Error','Error in deleting quiz','error');
          Swal.fire(
            {icon:'error',
                confirmButtonText:'OK',
                title:"<h1 style='color:black'>Error in deleting quiz</h1>",
              iconColor:'#000',
              background:'rgba(255, 255, 255, 0.8)',
              confirmButtonColor: "rgb(255 151 93)",
            })
        }
      }
      })
    }

}
