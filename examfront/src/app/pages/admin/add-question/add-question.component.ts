import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  public Editor = ClassicEditor;
  qId;
  question = {
    quiz:{},
    content:"",
    option1:"",
    option2:"",
    option3:"",
    option4:"",
    answer:""
  };
  qTitle: any;
  constructor(private _route:ActivatedRoute,
    private _question:QuestionService,
    private _snack:MatSnackBar,
    private _router:Router
    ){
    this.qId= this._route.snapshot.params.qid
    this.qTitle= this._route.snapshot.params.title
    this.question.quiz['qid'] = this.qId;
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
      // Swal.fire('Succes !!',"Question added Successfully.",'success')
      Swal.fire(
        {
          icon:'success',
            confirmButtonText:'OK',
            title:"<h1 style='color:black'>Question added Successfully.</h1>",
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
          // this._router.navigate(["/admin/view-questions/"+this.qId+"/"+this.qTitle])
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
