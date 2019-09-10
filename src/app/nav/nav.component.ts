import { Component, OnInit } from '@angular/core';
import { apiRes } from '../read/read.component';
import { ReadService } from '../services/read.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  api:apiRes
  constructor(private services: ReadService,public toastr: ToastrManager) { }

  ngOnInit() {
    this.services.name = null;
  }

  onSubmit(form){
    this.services.makeConnection().subscribe(res=>{
      if(form.valid){
      this.api = res as apiRes
      console.log("res:",this.api.status)
      if(this.api.status === "connected to server"){
        this.services.setInitialFlag(true)
        this.toastr.successToastr(this.api.status,'Status')
      }
      else{
        this.services.setInitialFlag(false)
        this.toastr.warningToastr(this.api.status,'Status')
      }
      this.services.name = undefined
        console.log(res)
    }
  })
}

}
