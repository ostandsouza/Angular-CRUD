import { Component, OnInit } from '@angular/core';
import { ReadService } from '../services/read.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  response: string;
  //anv : Array<string> = new Array();
  api: apiRes;
  col: string;
  length: number = 0;
  flag:boolean = false;
  data: Array<object> = new Array();
  _data:data;
  selectedIndex: number;
  keys: Array<string> = new Array();
  values: Array<string> = new Array();
  
  constructor(private services: ReadService, private _router: Router, private _route: ActivatedRoute) { 
    this.api = this._route.snapshot.data['list']
    this.response = this.api.status
    console.log( this.api.status)
  }

  ngOnInit() {
    this.services.jData = {};
    this.services.keys =[]
    this.services.values =[]
    this.services.name = null;
    // this.services.getCollectionList().subscribe(res => {
    //   //this.anv = res.status;
    //   this.api = res as apiRes
    //   this.response = this.api.status
    //  console.log( this.api.status)
    // });
  }

  getData(ctrl,index){
    event = ctrl;
    if(ctrl.selectedIndex == 0)
      alert("please select collection name from list")
    else{
      this.flag = true;
      this.col = this.response[ctrl.selectedIndex-1]
      this.services.name = this.col
      this.getCollectionData(this.col,index)
    }
  }

    getCollectionData(col,index){
      this.selectedIndex = index;
      this.services.getCollectionData(this.services.name).then(res=> {this._data = res as data
      this.data = this._data.status;
      length = this._data.status.length;
      this.services.keys = Object.keys(this._data.status[index]);
      this.services.values = Object.values(this._data.status[index]);
      if(this.services.name === 'ExecuteApi'){
        for(var i=0;i<this.services.keys.length;i++){
          this.services.jData[this.services.keys[i]] = this.services.values[i];
        }
          console.log("get values", this.services.jData)
          this.keys = Object.keys(this.services.jData["api"]);
          this.values = Object.values(this.services.jData["api"]);
      }
    });
  }

  
  routeEdit(){
    this._router.navigate(['/update']);
  }

  routeCreate(){
    this._router.navigate(['/create']);
  }

  deleteData(){
    this._router.navigate(['/delete']);
  }
  
  routeCollection(){
    this._router.navigate(['/collection']);
  }

}

export interface apiRes {
  status: string;
}

export interface data{
  status: [object]
}

export interface sData{
  status: object
}

