import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from './../../../services/category.service';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-add-quizzes',
  templateUrl: './add-quizzes.component.html',
  styleUrls: ['./add-quizzes.component.css']
})
export class AddQuizzesComponent {

  categories = [];

  quizData = {
    title:"",
    description:"",
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:''
    }
  }

  constructor(private _category:CategoryService, private _snack:MatSnackBar, private _quiz:QuizzService,private route:Router){

  }

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

  addQuizz(){
    console.log(this.quizData);
    if(!this.quizData.title ){
      this._snack.open("Title Required !!",'',{duration:3000});
      return;
    }
    if(!this.quizData.description){
      this._snack.open("Description Required !!",'',{duration:3000});
        return;
    }
    if(!this.quizData.maxMarks){
      this._snack.open("Maximum marks Required !!",'',{duration:3000});
        return;
    }
    if(!this.quizData.numberOfQuestions){
      this._snack.open("Number of questions Required !!",'',{duration:3000});
        return;
    }
    if(!this.quizData.category.cid){
      this._snack.open("Category Required !!",'',{duration:3000});
        return;
    }
    this._quiz.addQuiz(this.quizData).subscribe((data) =>{
      this.quizData.title='';
      this.quizData.description='';
      this.quizData.maxMarks='';
      this.quizData.numberOfQuestions='';
      this.quizData.active=true;
      this.quizData.category={cid:""};
      // Swal.fire('Succes !!',"Category added Successfully.",'success')
      Swal.fire(
        {
          icon:'success',
            confirmButtonText:'OK',
            title:"<h1 style='color:black'>Category added Successfully.</h1>",
          iconColor:'#000',
          background:'rgba(255, 255, 255, 0.8)',
          confirmButtonColor: "rgb(255 151 93)",
        }
      )
      .then(
        (data)=>{
          // this.route.navigate(["/admin/quizzes"])
        }
      )
    },
    (error)=>{
      console.log(error);
      // Swal.fire('Error !!',"Server error.",'error')
      Swal.fire(
        {
          icon:'error',
            confirmButtonText:'OK',
            title:"<h1 style='color:black'>Server error.</h1>",
          iconColor:'#000',
          background:'rgba(255, 255, 255, 0.8)',
          confirmButtonColor: "rgb(255 151 93)",
        }
      )
    }
    )
  }
}
