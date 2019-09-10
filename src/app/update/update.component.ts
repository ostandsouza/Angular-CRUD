import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReadService } from '../services/read.service';
import { data, apiRes } from '../read/read.component';
//import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  @ViewChild('form') public createForm: NgForm
  response: string;
  //anv : Array<string> = new Array();
  api: apiRes;
  col: string;
  length: number = 0;
  flag:boolean = false;
  data: Array<object> = new Array();
  keys: Array<string> = new Array();
  values: Array<string> = new Array();
  _data:data;
  selectedIndex: number;
  str: string;

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
      this.services.name = this.col
      this.getCollectionData(this.col,index)
    }
  }

    getCollectionData(col,index){
      this.selectedIndex = index;
      this.services.getCollectionData(this.services.name).then(res=> {this._data = res as data
      this.data = this._data.status;
      console.log("_data:", this._data.status)
      length = this._data.status.length;
      this.services.keys = Object.keys(this._data.status[index]);
      this.services.values = Object.values(this._data.status[index]);
      console.log("get key",  this.services.keys)
      console.log("get values", this.services.values)
      // for(var i=0;i<this.services.keys.length;i++){
      //   delete this.services.jData[this.services.keys[i]]
      // }
      this.services.jData = {};
      if(this.services.name === 'ExecuteApi'){
        for(var i=0;i<this.services.keys.length;i++){
          this.services.jData[this.services.keys[i]] = this.services.values[i];
        }
          console.log("get values", this.services.jData["api"])
          this.keys = Object.keys(this.services.jData["api"]);
          this.values = Object.values(this.services.jData["api"]);
      }
    });
  }

  onSubmit(){
    if(this.services.name != 'ExecuteApi'){
      console.log("key",  this.services.keys)
      console.log("values", this.services.values)
      for(var i=0;i<this.services.keys.length;i++){
        this.services.jData[this.services.keys[i]] = this.services.values[i];
      }
  }
  else{
    for(var i=0;i<this.keys.length;i++){
      this.services.jData["api"][this.keys[i]] = this.values[i];
    }
  }
    // this.services.jKey[this.services.keys[0]] = this.services.values[0];
    // console.log("jKey:",this.services.jKey)
    delete this.services.jData["_id"];
    //delete this.data[this.selectedIndex]["_id"];
    console.log("res:",this.data[this.selectedIndex])
    console.log("res:", this.services.jData)
    this.services.jKey = this.data[this.selectedIndex]["_id"];
    this.services.updateCollection().subscribe(res=>{
      this.api = res as apiRes
      console.log("res:",this.api.status)
      if(this.api.status === "document was modified successfully")
        this.toastr.successToastr(this.api.status,'Status')
      else
        this.toastr.warningToastr(this.api.status,'Status')
      this.getCollectionData(length,this.selectedIndex);
    })
    this.services.values.splice(0,this.services.values.length);
  }

  routeView(){
    this._router.navigate(['/read']);
  }

  deleteData(){
    this._router.navigate(['/delete']);
  }

  routeCreate(){
    this._router.navigate(['/create']);
  }

  routeCollection(){
    this._router.navigate(['/collection']);
  }

  toggleSelection(event):void{
    console.log("val:",this.values)
    
  }

}
