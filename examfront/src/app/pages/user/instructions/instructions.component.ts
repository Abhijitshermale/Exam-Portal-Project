import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { QuizzService } from 'src/app/services/quizz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent {

  qid:any;
  quiz:any;
  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizzService,
    private _snack:MatSnackBar,
    private _router:Router,
  ){
    this.qid = this._route.snapshot.params.qid;
    this._quiz.getQuiz(this.qid).subscribe({
      next:((data)=>{
        console.log(data);
        this.quiz= data;
      }),
      error:((error)=>{
        console.log(error);
        this._snack.open("Error in loading all data !!",'',{duration:3000});
      })
    })
  }

  startQuiz(){
    Swal.fire(
      {
        icon:'info',
        confirmButtonText:'Start',
        showCancelButton:true,
        title:"<h1 style='color:black'>Do you want to start the quiz ? </h1>",
        iconColor:'#fff',
        background:'rgba(255, 255, 255, 0.5)',
        confirmButtonColor: "#fbceb5",
        
      }
    ).then((result)=>{
      if(result.isConfirmed){
              this._router.navigate(['/start/'+this.quiz?.qid])            
      }
    })
  }
}
