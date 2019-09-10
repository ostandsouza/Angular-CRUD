import { Component, OnInit } from '@angular/core';
import { ReadService } from '../services/read.service';
import { Router, ActivatedRoute } from '@angular/router';
import { data, apiRes, sData } from '../read/read.component';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
    _api: string;
    _id: string;
    _data:sData;
    api: apiRes;
    data: Array<object> = new Array();
    keys: Array<string> = new Array();
    values: Array<string> = new Array();
  
    constructor(private services: ReadService, private _router: Router, private _route: ActivatedRoute,public toastr: ToastrManager) { }
  
    ngOnInit() {
      this._route.params.subscribe(params => {
        this._api = params['api'];
        this._id = params['id'];
        this.DocumentData();
    })
  }
  
    DocumentData(){
      this.services.getDocumentData(this._api,this._id).then(res=> {this._data = res as sData
        //this.data = this._data.status;
        console.log("_data:", this._data.status)
        //length = this._data.status.length;
        this.services.keys = Object.keys(this._data.status);
        this.services.values = Object.values(this._data.status);
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
      console.log("res:",this._data.status)
      console.log("res:", this.services.jData)
      this.services.jKey = this._data.status["_id"];
      this.services.updateCollection().subscribe(res=>{
        this.api = res as apiRes
        console.log("res:",this.api.status)
        if(this.api.status === "document was modified successfully")
          this.toastr.successToastr(this.api.status,'Status')
        else
          this.toastr.warningToastr(this.api.status,'Status')
          this.DocumentData();
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
  
    toggleSelection(event):void{
      console.log("val:",this.values)
      
    }

}
