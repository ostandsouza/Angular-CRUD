import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { apiRes } from '../read/read.component';
import { ReadService } from './read.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<apiRes>{

  constructor(private services: ReadService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<apiRes>{
    return this.services.getCollectionList();
  }
}
