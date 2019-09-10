import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiRes } from '../read/read.component';

@Injectable({
  providedIn: 'root'
})
export class ReadService {

  name: string;
  private initialFlag = false
  keys: Array<string> = new Array();
  values: Array<string> = new Array();
  jData: any = {};
  jKey: any = {};
  New: any = {};
  constructor(private http : HttpClient) { }

  setInitialFlag(value: boolean){
    this.initialFlag = value;
  }
  
  get InitialFlag(){
    return this.initialFlag
  }

  getStatus(){
    return this.http.get<boolean>('/api/conn').toPromise();
  }

  makeConnection(){
    let body = {
      "url": this.name
    }
    let newBody = JSON.stringify(body)
    //mongodb://localhost:27017/RestApi  
    return this.http.post('/api/',JSON.parse(newBody))
  }
  
  getCollectionList():Observable<apiRes>{
    return this.http.get<apiRes>('/api/list');
  }

  getCollectionData(collectionName:string){
    let body = {
      "api": collectionName
    }
    let newBody = JSON.stringify(body)
    return this.http.post('/api/read',JSON.parse(newBody)).toPromise();
  }

  getDocumentData(collectionName:string, _id:string){
    this.name = collectionName;
    let body = {
      "api": collectionName,
      "id": _id
    }
    let newBody = JSON.stringify(body)
    return this.http.post('/api/find',JSON.parse(newBody)).toPromise();
  }

  addCollection(){
    let body = {
      "api": this.name,
      "doc":this.jData
    }
    console.log(body)
    let newBody = JSON.stringify(body)
    return this.http.post('/api/create',JSON.parse(newBody))
  }

  updateCollection(){
    let body = {
      "api": this.name,
      "id":this.jKey,
      "replace":this.jData
    }
    console.log(body)
    let newBody = JSON.stringify(body)
    return this.http.post('/api/update',JSON.parse(newBody))
  }

  unsetCollection(){
    let body = {
      "api": this.name,
      "id":this.jKey,
      "replace":this.New
    }
    console.log(body)
    let newBody = JSON.stringify(body)
    return this.http.post('/api/unset',JSON.parse(newBody))
  }


  deleteCollection(){
    let body = {
      "api": this.name,
      "id":this.jKey
    }
    console.log(body)
    let newBody = JSON.stringify(body)
    return this.http.post('/api/delete',JSON.parse(newBody))
  }

  createCollection(){
    let body = {
      "api": this.name
    }
    console.log(body)
    let newBody = JSON.stringify(body)
    return this.http.post('/api/new',JSON.parse(newBody))
  }

  dropCollection(){
    let body = {
      "api": this.name
    }
    console.log(body)
    let newBody = JSON.stringify(body)
    return this.http.post('/api/drop',JSON.parse(newBody))
  }
 
}
