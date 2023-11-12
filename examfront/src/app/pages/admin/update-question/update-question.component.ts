import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizzService } from 'src/app/services/quizz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent {
  question:any;
  quesId: any;

  constructor(private _snack:MatSnackBar, private _route:ActivatedRoute, private _question:QuestionService, private _cat:CategoryService, private _router:Router){
    this.quesId = this._route.snapshot.params.qid;

    this._question.getQuestion(this.quesId).subscribe({
      next:((data)=>{
        this.question=data;
        console.log('this.question: ', this.question);
      }),
      error:((error)=>{
        console.log(error);
      })
    })
  }

  formSubmit(){
    if(!this.question.content ){
      this._snack.open("Content Required !!",'',{duration:3000});
      return;
    }
    if(!this.question.option1){
      this._snack.open("Option 1 Required !!",'',{duration:3000});
        return;
    }
    if(!this.question.option2){
      this._snack.open("Option 2 Required !!",'',{duration:3000});
        return;
    }
    if(!this.question.answer){
      this._snack.open("Answer Required !!",'',{duration:3000});
        return;
    }
    this._question.addQuestion(this.question).subscribe((data) =>{
      // Swal.fire('Succes !!',"Question Updated Successfully.",'success')
      Swal.fire(
        {
          icon:'success',
            confirmButtonText:'OK',
            title:"<h1 style='color:black'>Question Updated Successfully.</h1>",
          iconColor:'#000',
          background:'rgba(255, 255, 255, 0.8)',
          confirmButtonColor: "rgb(255 151 93)",
        }
      )
      .then(
        (data)=>{
          this.question.content='';
          this.question.option1='';
          this.question.option2='';
          this.question.option3='';
          this.question.option4='';
          this.question.answer='';
          this._router.navigate(["/admin/view-questions/"+this.question.quiz.qid+"/"+this.question.quiz.title])
        }
      )
    },
    (error)=>{
      console.log(error);
      // Swal.fire('Error !!',"Server error.",'error')
      Swal.fire(
        {
          icon:'success',
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
