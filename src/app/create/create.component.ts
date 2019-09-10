import { Component, OnInit, ViewChild } from '@angular/core';
import { apiRes, data } from '../read/read.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ReadService } from '../services/read.service';
//import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('form') public createForm: NgForm
  response: string;
  //anv : Array<string> = new Array();
  api: apiRes;
  col: string;
  length: number = 0;
  flag:boolean = false;
  data: Array<object> = new Array();
  _data:data;
  selectedIndex: number;

  constructor(private services: ReadService, private _router: Router, private _route: ActivatedRoute,public toastr: ToastrManager) { 
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
      this.services.name = this.col;
      this.getCollectionData(this.col,index)
    }
  }

    getCollectionData(col,index){
      this.selectedIndex = index;
      this.services.getCollectionData( this.services.name).then(res=> {this._data = res as data
      this.data = this._data.status;
      length = this._data.status.length;
      this.services.keys = Object.keys(this._data.status[index]);
      this.services.keys.splice(0,1);
      console.log( this.services.keys)
      //this.services.values = Object.values(this._data.status[index]);
      this.services.values.splice(0,this.services.values.length);
      console.log(this.services.values)
      this.services.jData = {};
    });
  }

  onSubmit(){
    for(var i=0;i<this.services.keys.length;i++){
      this.services.jData[this.services.keys[i]] = this.services.values[i];
    }
    console.log(this.services.jData)
 this.services.addCollection().subscribe(res=>{
      this.api = res as apiRes
      console.log("res:",this.api.status)
      if(this.api.status === "document were successfully inserted")
        this.toastr.successToastr(this.api.status,'Status')
      else
        this.toastr.warningToastr(this.api.status,'Status')
    })
    this.services.values.splice(0,this.services.values.length);
  }   

  routeCollection(){
    this._router.navigate(['/collection']);
  }

  routeEdit(){
    this._router.navigate(['/update']);
  }

  routeView(){
    this._router.navigate(['/read']);
  }

  deleteData(){
    this._router.navigate(['/delete']);
  }
}
