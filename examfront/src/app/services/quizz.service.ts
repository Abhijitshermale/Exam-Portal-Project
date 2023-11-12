import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper/helper';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  constructor( private _http : HttpClient) { }

  public getQuizzes(){
    return this._http.get(`${baseUrl}/api/quiz/`)
  }

  public addQuiz(quiz){
    return this._http.post(`${baseUrl}/api/quiz/`,quiz);
  }
  
  public deleteQuizz(qid){
    return this._http.delete(`${baseUrl}/api/quiz/${qid}`);
  }

  // get the single quiz
  public getQuiz(qid){
    return this._http.get(`${baseUrl}/api/quiz/${qid}`)
  }

  //update Quiz
  public updateQuiz(quiz){
    return this._http.put(`${baseUrl}/api/quiz/`,quiz)
  }

  // get quizzes of category
  public getQuizzesOfCategory(cid){
    return this._http.get(`${baseUrl}/api/quiz/category/${cid}`)
  }

  // get active quizzes
  public getActiveQuizzes(){
    return this._http.get(`${baseUrl}/api/quiz/active`)
  }

  //get active quizzes of category
  public getActiveQuizzesOfCategory(cid){
    return this._http.get(`${baseUrl}/api/quiz/category/active/${cid}`);
  }
}
