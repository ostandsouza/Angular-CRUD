import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';
import { ReadComponent } from './read/read.component';
import { CreateComponent } from './create/create.component';
import { NavComponent } from './nav/nav.component';
import { RouteGuard, RouteBlock } from './route.guard';
import { CollectionComponent } from './collection/collection.component';
import { ResolverService } from './services/resolver.service';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path: 'create', component:CreateComponent, canActivate: [RouteGuard], canDeactivate: [RouteBlock], resolve:{list:ResolverService}},
  {path: 'read', component:ReadComponent, canActivate: [RouteGuard], resolve:{list:ResolverService}},
  {path: 'update', component:UpdateComponent, canActivate: [RouteGuard], canDeactivate: [RouteBlock], resolve:{list:ResolverService}},
  {path: 'delete', component:DeleteComponent, canActivate: [RouteGuard],resolve:{list:ResolverService}},
  {path: 'collection', component:CollectionComponent, canActivate: [RouteGuard]},
  {path: 'update/:api/:id', component:SearchComponent},
  {path: '', component:NavComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteGuard,RouteBlock,ResolverService],
})
export class AppRoutingModule { }
