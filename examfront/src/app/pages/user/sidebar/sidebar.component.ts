import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  categories:any;
  constructor(private _cat:CategoryService, private _snack:MatSnackBar){
    this._cat.getCategories().subscribe({
      next:((data)=>{
        this.categories = data;
      }),
      error:((error)=>{
        this._snack.open("Error in loading categories from server",'',{duration:3000});
      })
    })
  }
}
