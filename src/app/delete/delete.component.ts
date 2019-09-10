import { Component, OnInit } from '@angular/core';
import { apiRes, data } from '../read/read.component';
import { ReadService } from '../services/read.service';
import { Router, ActivatedRoute } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
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
      this.services.getCollectionData( this.services.name).then(res=> {this._data = res as data
      this.data = this._data.status;
      length = this._data.status.length;
      this.services.keys = Object.keys(this._data.status[index]);
      this.services.values = Object.values(this._data.status[index]);
    });
  }
  onSubmit(){ 
    delete this.data[this.selectedIndex]["_id"];
    this.services.jKey = this.data[this.selectedIndex];
      this.services.deleteCollection().subscribe(res=>{
        this.api = res as apiRes
        console.log("res:",this.api.status)
        if(this.api.status === "document was deleted successfully")
          this.toastr.successToastr(this.api.status,'Status')
        else
          this.toastr.warningToastr(this.api.status,'Status')
        this.getCollectionData(length,this.selectedIndex);
      })
      this.services.values.splice(0,this.services.values.length);
    }

  routeEdit(){
    this._router.navigate(['/update']);
  }

  routeView(){
    this._router.navigate(['/read']);
  }

  routeCreate(){
    this._router.navigate(['/create']);
  }
  
  routeCollection(){
    this._router.navigate(['/collection']);
  }


}
