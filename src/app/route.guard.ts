import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { ReadService } from './services/read.service';
import { CanDeactivate } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { CollectionComponent } from './collection/collection.component';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(private services: ReadService, private _router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.services.InitialFlag){
      this.services.getStatus().then(res => {this.services.setInitialFlag(res);
      console.log("res:",res);
      this._router.navigate(['/']);
       return false
      });
    }
    else 
      return true
  }
}

@Injectable()
export class RouteBlock implements CanDeactivate<CreateComponent | UpdateComponent | CollectionComponent> {

  constructor(private services: ReadService, private _router: Router){}

  canDeactivate(component:CreateComponent | UpdateComponent | CollectionComponent):boolean{
    if(component.createForm.dirty){
       return confirm('Are you sure you want to discard your changes?')
    }
    else 
      return true
  }
}
//     @Injectable()
// export class RouteGuard implements CanLoad {
//   canLoad(
//     route: Route
//   ): Observable<boolean> | Promise<boolean> | boolean {
//     return false;
//   }
//}

