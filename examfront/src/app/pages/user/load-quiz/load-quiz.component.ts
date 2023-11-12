import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent {

  catId:any;
  quizzes;

  constructor(private _route:ActivatedRoute, 
              private _quiz:QuizzService,
              private _snack:MatSnackBar
    ){
    this._route.params.subscribe({
      next:((data)=>{
        this.catId= data.catId;
        if(this.catId == 0){
          console.log('Load all the quiz');
          this._quiz.getActiveQuizzes().subscribe({
            next:((data)=>{
              this.quizzes = data;
            }),
            error:((error)=>{
              console.log(error);
              this._snack.open("Error in loading all data !!",'',{duration:3000});
            })
          })
        }else{
          this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe({
            next:((data)=>{
              this.quizzes = data;
            }),
            error:((error)=>{
              console.log(error);
              this._snack.open("Error in loading all data !!",'',{duration:3000});
            })
          })
        }
      })
    })
  }
}
