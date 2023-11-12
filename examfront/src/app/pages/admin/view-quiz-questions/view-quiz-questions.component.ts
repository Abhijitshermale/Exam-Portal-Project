import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent {
  qId;
  qTitle;
  questions=[]

  constructor(private _route:ActivatedRoute, private _question:QuestionService){
    this.qId = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;
    this._question.getQuestionOfQuiz(this.qId).subscribe((data:any)=>{
      this.questions = data;
      console.log('this.questions for quizzes : ', this.questions);

  },
  (error)=>{
    console.log(error);
    Swal.fire('Error !!',"Error in loading data.","error");
  }
  );
  }
  deleteQuestion(quesId){
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
        this._question.deleteQuestion(quesId).subscribe({
          next:((data)=>{
            this.questions = this.questions.filter((question)=>question.quesId != quesId)
              // Swal.fire('Success','Question Deleted','success');
              Swal.fire(
                {
                  icon:'success',
                    confirmButtonText:'OK',
                    title:"<h1 style='color:black'>Question Deleted ?</h1>",
                  iconColor:'#000',
                  background:'rgba(255, 255, 255, 0.8)',
                  confirmButtonColor: "rgb(255 151 93)",
                }
              )
          }),
          error:((error)=>{
            console.log(error);
            // Swal.fire('Error','Error in deleting question','error');
            Swal.fire(
              {
                icon:'error',
                  confirmButtonText:'OK',
                  title:"<h1 style='color:black'>Error in deleting question</h1>",
                iconColor:'#000',
                background:'rgba(255, 255, 255, 0.8)',
                confirmButtonColor: "rgb(255 151 93)",
              }
            )
          })
        })
      }
    })
  }
}
