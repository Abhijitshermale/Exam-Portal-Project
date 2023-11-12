import { QuizzService } from './../../../services/quizz.service';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { count } from 'rxjs';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent {

  quizzes = [];

  constructor(private _quizz:QuizzService){

  }

  ngOnInit(): void {
    this._quizz.getQuizzes().subscribe((data:any)=>{
        this.quizzes = data;
        console.log('this.quizzes: ', this.quizzes);

    },
    (error)=>{
      console.log(error);
      Swal.fire('Error !!',"Error in loading data.","error");
    }
    );
  }

  updateQuiz(c){}

  deleteQuiz(qid){
    // Swal.fire(
    //   {
    //     icon:'info',
    //     title:'Are you Sure ?',
    //     confirmButtonText:'Delete',
    //     showCancelButton:true,
    //   }
    Swal.fire(
      {
        icon:'info',
          confirmButtonText:'OK',
          title:"<h1 style='color:black'>Are you Sure ?</h1>",
        iconColor:'#000',
        background:'rgba(255, 255, 255, 0.8)',
        confirmButtonColor: "rgb(255 151 93)",
      }
    ).then((result)=>{
      if(result.isConfirmed){
        this._quizz.deleteQuizz(qid).subscribe((data)=>{
          this.quizzes = this.quizzes.filter((quiz)=>quiz.qId != qid)
          // Swal.fire('Success','Quiz Deleted','success');
          Swal.fire(
            {
              icon:'success',
                confirmButtonText:'OK',
                title:"<h1 style='color:black'>Quiz Deleted</h1>",
              iconColor:'#000',
              background:'rgba(255, 255, 255, 0.8)',
              confirmButtonColor: "rgb(255 151 93)",
            }
          )
        }),
        (error)=>{
          // Swal.fire('Error','Error in deleting quiz','error');
          Swal.fire(
            {
              icon:'error',
                confirmButtonText:'OK',
                title:"<h1 style='color:black'>Error in deleting quiz.</h1>",
              iconColor:'#000',
              background:'rgba(255, 255, 255, 0.8)',
              confirmButtonColor: "rgb(255 151 93)",
            }
          )
        }
      }
      })
    }

}
