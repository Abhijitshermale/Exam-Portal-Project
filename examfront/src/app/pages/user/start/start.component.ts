import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  quizId:any;
  questions:any;
  correctAnswers=0;
  marksGot=0;
  attemptedQuestion=0;
  timer:any;
  isSubmit: boolean=false;
  constructor(
    private _locationStrategy:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _snack:MatSnackBar
  ){
    this.preventBackButton();
    this.quizId = this._route.snapshot.params.qid;
    console.log('this.quizId: ', this.quizId);
    this.loadQuestion();

  }
  loadQuestion() {
    this._question.getQuestionOfQuizForTest(this.quizId).subscribe({
      next:((data)=>{
        console.log('data: ', data);
        this.questions = data;
        if(this.questions){
          // this.questions.forEach(element => {
          //   element['givenAnswer']='';
            this.timer = this.questions.length * 2 * 60
            this.startTimer();
          // });
        }
      }),
      error:((error) => {
        console.log('error: ', error);
        this._snack.open("Error in loading all data !!",'',{duration:3000});
      })
    })
  }

  preventBackButton(){
    history.pushState(null,null,location.href);
    this._locationStrategy.onPopState(()=>{
      history.pushState(null,null,location.href);
    })
  }

  submitQuiz(data?){
    if(data && data == 'timer'){
      this.isSubmit=true;
      this._question.evalQuiz(this.questions).subscribe({
        next:((data:any)=>{
          console.log('data: ', data);
          this.marksGot= data.marksGot;
          this.correctAnswers = data.correctAnswers;
          this.attemptedQuestion = data.attemptedQuestion;
        }),
        error:((error)=>{
          console.log('error: ', error);
        })
      })
    }else{
      Swal.fire(
        {
          icon:'info',
          confirmButtonText:'Submit',
          showCancelButton:true,
          title:"<h1 style='color:black'>Do you want to submit the quiz ?</h1>",
        iconColor:'#000',
        background:'rgba(255, 255, 255, 0.8)',
        confirmButtonColor: "rgb(255 151 93)",
        }
      ).then((result)=>{
        if(result.isConfirmed){
          this.isSubmit=true;
          this._question.evalQuiz(this.questions).subscribe({
            next:((data:any)=>{
              console.log('data: ', data);
              this.marksGot= parseFloat(Number(data.marksGot).toFixed(2));
              this.correctAnswers = data.correctAnswers;
              this.attemptedQuestion = data.attemptedQuestion;
            }),
            error:((error)=>{
              console.log('error: ', error);
            })
          })
        }
      })
    }
  }

  startTimer(){
    let t:any = window.setInterval(()=>{
      // code
      if(this.timer <= 0 ){
        this.submitQuiz('timer');
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }

  getFormatedTime(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer-mm*60;
    return `${mm} min : ${ss} sec`
  }

  printPage(){
    window.print();
  }
}
