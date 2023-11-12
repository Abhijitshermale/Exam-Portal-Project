import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizzService } from 'src/app/services/quizz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _snack:MatSnackBar, private _route:ActivatedRoute, private _quizz:QuizzService, private _cat:CategoryService, private router:Router){}
  qId = 0;
  quiz;
  categories;
  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;

    this._quizz.getQuiz(this.qId).subscribe(
      (data)=>{
        this.quiz = data;
        console.log('this.quiz: ', this.quiz);
      },
      (error)=>{
        console.log(error);
      }
    );
    this._cat.getCategories().subscribe(
      (data)=>{
        this.categories = data;
      },
      (error)=>{
        alert(error);
      }
    )
  }

  updateQuizData(){
    console.log("this.quiz for update:"+this.quiz);
    if(!this.quiz.title ){
      this._snack.open("Title Required !!",'',{duration:3000});
      return;
    }
    if(!this.quiz.description){
      this._snack.open("Description Required !!",'',{duration:3000});
        return;
    }
    if(!this.quiz.maxMarks){
      this._snack.open("Maximum marks Required !!",'',{duration:3000});
        return;
    }
    if(!this.quiz.numberOfQuestions){
      this._snack.open("Number of questions Required !!",'',{duration:3000});
        return;
    }
    if(!this.quiz.category.cid){
      this._snack.open("Category Required !!",'',{duration:3000});
        return;
    }
    this._quizz.updateQuiz(this.quiz).subscribe((data) =>{
      this.quiz.title='';
      this.quiz.description='';
      this.quiz.maxMarks='';
      this.quiz.numberOfQuestions='';
      this.quiz.active=true;
      this.quiz.category={cid:""};
      // Swal.fire('Succes !!',"Quiz updated Successfully.",'success')
      Swal.fire(
        {icon:'success',
            confirmButtonText:'OK',
            title:"<h1 style='color:black'>Quiz updated Successfully.</h1>",
          iconColor:'#000',
          background:'rgba(255, 255, 255, 0.8)',
          confirmButtonColor: "rgb(255 151 93)",
        })
      .then(
        (data)=>{
          this.router.navigate(["/admin/quizzes"])
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
