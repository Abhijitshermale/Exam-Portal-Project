import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper/helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  //get questions of Quiz
    public getQuestionOfQuiz(qid){
      return this._http.get(`${baseUrl}/api/question/quiz/all/${qid}`)
    }
  //get questions of Quiz for test
    public getQuestionOfQuizForTest(qid){
      return this._http.get(`${baseUrl}/api/question/quiz/${qid}`)
    }

  //add question 
  public addQuestion(question){
    return this._http.post(`${baseUrl}/api/question/`,question)
  }  

  //get single question
  public getQuestion(qid){
    return this._http.get(`${baseUrl}/api/question/${qid}`)
  }

  //delete Question by id
  public deleteQuestion(quesId){
    return this._http.delete(`${baseUrl}/api/question/${quesId}`)
  }
  
  // eval quiz
  public evalQuiz(data){
    return this._http.post(`${baseUrl}/api/question/eval-quiz`,data)
  }
}
