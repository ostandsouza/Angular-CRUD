import { Component, OnInit, ViewChild } from '@angular/core';
import { ReadService } from '../services/read.service';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
import { apiRes, data } from '../read/read.component';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  @ViewChild('newCollection') public createForm: FormGroup
  response: string;
  anv : Array<string> = new Array();
  api: apiRes;
  data: Array<string> = new Array();
  label: Array<string> = new Array();
  jData: any = {};
  i: number = 0;
  j: number = 0;
  collectionFlag = false
  myVar = "";
  manageFlag = true
  _data:data1;
  selectedIndex: number;
  keys: Array<string> = new Array();
  values: Array<string> = new Array();
  input: Array<string> = new Array();
  status: Array<boolean> = new Array();
  length: number = 0;


  constructor(private services: ReadService, private _router: Router, private fb: FormBuilder,public toastr: ToastrManager) { }
  newCollection: FormGroup; 

  ngOnInit() {
    this.services.jData = {};
    this.services.keys =[]
    this.services.values =[]
    this.services.name = null;
    this.newCollection = this.fb.group({
      key_values: this.fb.array([
        this.addKeyFormGroup()
      ])
    })
  }

  addKeyFormGroup():FormGroup{
    return this.fb.group({
      key: ['',Validators.required],
      values: ['']
    })
  }

  addDivFormGroup():void{
    (<FormArray>this.newCollection.get('key_values')).push(this.addKeyFormGroup());
  }

  logKeyValuePairs(group:FormGroup): void{
    Object.keys(group.controls).forEach((keys: string)=>{
    const abstractCtrl = group.get(keys)
    if(abstractCtrl instanceof FormGroup){
      this.logKeyValuePairs(abstractCtrl)
    }
    else if(abstractCtrl instanceof FormArray){
      for(const control of abstractCtrl.controls){
        if(control instanceof FormGroup)
          this.logKeyValuePairs(control)
      }
    }
    else{
      console.log('key = ' +keys + ' value = '+abstractCtrl.value);
      if(keys ==="key"){
        this.label[this.i] = abstractCtrl.value;
        this.i++
      }
      else{
        this.anv[this.j] = abstractCtrl.value;
        this.j++
      }
    }
  })
  }


  setMyVar(value: string){
    this.myVar = value;
    this.manageFlag = false;
    console.log("res:",this.myVar)
    if(this.myVar === 'delete' || this.myVar === 'modify'){
      this.services.getCollectionList().subscribe(res => {
        //this.anv = res.status;
        this.api = res as apiRes
        this.response = this.api.status
       console.log( this.api.status)
      });
    }
  }

  setFlag(value: boolean){
    this.collectionFlag = value;
  }
  
  get Flag(){
    return this.collectionFlag
  }

  onSubmit(form){
    if(form.valid){
      this.services.createCollection().subscribe(res=>{
        this.api = res as apiRes
        console.log("res:",this.api.status)
        if(this.api.status === "Collection creation was successfull"){
          this.toastr.successToastr(this.api.status,'Status')
          this.setFlag(true)
        }
        else{
          this.toastr.warningToastr(this.api.status,'Status')
          this.setFlag(false)
        }
      })
    }
  }

  removeDiv(index:number): void{
    (<FormArray>this.newCollection.get('key_values')).removeAt(index);
  }

  removePair(index:number): void{
    if(this.services.name != 'ExecuteApi'){
      this.services.New[this.services.keys[index]] = this.services.values[index];
      this.services.jKey = this.data[this.selectedIndex]["_id"];
      this.services.unsetCollection().subscribe(res=> {
        this.api = res as apiRes
        console.log("res:",this.api.status)
        if(this.api.status === "document was modified successfully")
          this.toastr.successToastr(this.api.status,'Status')
        else
          this.toastr.warningToastr(this.api.status,'Status')
        this.getCollectionData(length,this.selectedIndex);
      })
    }
    else{
      delete this.services.jData["api"][this.keys[index]];
      //delete this.status[index]
      console.log('jData = ', this.services.jData)
      //this.onSave();
      delete this.services.jData["_id"];
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
    }
    this.services.New = {};
  }

  storeTarget(name): void{
  this.services.name = this.response[name.selectedIndex-1]
  }

  changeFlag(): void{
    this.setFlag(true)
  }

  deleteCollection(): void{
    this.services.dropCollection().subscribe(res=>{
      this.api = res as apiRes
      console.log("res:",this.api.status)
      if(this.api.status === "Collection was deleted"){
        this.toastr.successToastr(this.api.status,'Status')
      }
      else{
        this.toastr.warningToastr(this.api.status,'Status')
      }
      this.manageFlag = true
    })
  }

  getData(ctrl,index){
    if(ctrl.selectedIndex == 0)
      alert("please select collection name from list")
    else{
      this.services.name = this.response[ctrl.selectedIndex-1]
      this.getCollectionData(this.services.name,index)
    }
  }

  getCollectionData(col,index){
    this.selectedIndex = index;
    this.services.getCollectionData(this.services.name).then(res=> {this._data = res as data1
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

async onSave(){
  console.log('input = ',this.input)
  console.log('status = ',this.status)
  if(this.services.name != 'ExecuteApi'){
    this.services.jData = {};
    for(var i=0;i<this.services.keys.length;i++){
      this.services.jData[this.services.keys[i]] = this.services.values[i];
    }
  console.log('jData = ', this.services.jData)
  await this.logKeyValuePairs(this.newCollection)
  for(var i=0;i<this.label.length;i++){
    console.log("label",this.label[i])
    console.log("anv",this.anv[i])
    this.services.jData[this.label[i]] = this.anv[i];
  }
}
else {
  for(var i=0;i<this.input.length;i++){
    if(this.status[i]=== undefined)
      this.status[i] = false;
    this.services.jData["api"][this.input[i]] = this.status[i];
  }
  console.log('jData = ', this.services.jData)
}
  delete this.services.jData["_id"];
  Object.keys(this.services.jData).forEach(key => this.services.jData[key] === undefined && delete this.services.jData[key])
  //delete this.data[this.selectedIndex]["_id"];
  console.log("res:",this.data[this.selectedIndex])
  console.log("resd:", this.services.jData)

  this.services.jKey = this.data[this.selectedIndex]["_id"];
  this.services.updateCollection().subscribe(res=>{
    this.api = res as apiRes
    console.log("res:",this.api.status)
    if(this.api.status === "document was modified successfully")
      this.toastr.successToastr(this.api.status,'Status')
    else
      this.toastr.warningToastr(this.api.status,'Status')
  })
  this.services.values.splice(0,this.services.values.length);
  this.services.keys.splice(0,this.services.keys.length);
  
  this.setFlag(false)
  this.services.name =  "";
  this.manageFlag = true;
  this.label = [];
  this.anv = [];
  this.i = 0;
  this.j = 0;
  this.services.jData = {};
  this.status = [];
  this.input = []
//   const control = <FormArray>this.newCollection.controls['key_values'];
//   console.log("control:",control)
//   console.log("val:",control.value)
//   for(let i = control.length-1; i >= 0; i--) {
//     control.removeAt(i)
//   }
//   console.log("pval:",control.value)
}

async onCreate(){
  console.log('jData = ', this.services.jData)
  await this.logKeyValuePairs(this.newCollection)
  for(var i=0;i<this.label.length;i++){
    console.log("label",this.label[i])
    console.log("anv",this.anv[i])
    this.services.jData[this.label[i]] = this.anv[i];
  }
  this.services.addCollection().subscribe(res=>{
    this.api = res as apiRes
    console.log("res:",this.api.status)
    if(this.api.status === "document were successfully inserted")
      this.toastr.successToastr(this.api.status,'Status')
    else
      this.toastr.warningToastr(this.api.status,'Status')
  })
  this.services.values.splice(0,this.services.values.length);   
  this.setFlag(false)
  this.services.name =  "";
  this.manageFlag = true
  this.label = [];
  this.anv = [];
  this.i = 0;
  this.j = 0;
  this.services.jData = {};
}

resetForm(){
  this.newCollection.reset();
  for(var i = (<FormArray>this.newCollection.get('key_values')).length; i>1; i-- ){
    (<FormArray>this.newCollection.get('key_values')).removeAt(i-1);
  }
}
}

export interface data1{
  status: [string]
}