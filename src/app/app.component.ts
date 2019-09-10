import { Component } from '@angular/core';
import { ReadService } from './services/read.service';
//import { ToastrService } from 'ngx-toastr';
import { apiRes } from './read/read.component';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "crud";
  showLoadingIndicator = true;

  constructor(private _router: Router) { 
    this._router.events.subscribe((routerEvent: Event)=>{
      if(routerEvent instanceof NavigationStart){
        this.showLoadingIndicator = true;
      }
      if(routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError){
        this.showLoadingIndicator = false;
      }
    })
  }

  


}
