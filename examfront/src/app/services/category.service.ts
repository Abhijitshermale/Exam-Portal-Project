import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper/helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private _http : HttpClient) { }

  // get the single quiz
  public getCategory(cid){
    return this._http.get(`${baseUrl}/api/category/${cid}`)
  }

  public getCategories(){
    return this._http.get(`${baseUrl}/api/category/`)
  }

  public addCategory(category){
    return this._http.post(`${baseUrl}/api/category/`,category);
  }

  public deleteCategory(cid){
    return this._http.delete(`${baseUrl}/api/category/${cid}`);
  }

  //update Quiz
  public updateCategory(category){
    return this._http.put(`${baseUrl}/api/category/`,category)
  }
}
