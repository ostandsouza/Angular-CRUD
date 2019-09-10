import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material';
import { NavComponent } from './nav/nav.component';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component'
import { RouteGuard, RouteBlock } from './route.guard';
import { ReadService } from './services/read.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import { ToastrModule } from 'ngx-toastr';
import { CollectionComponent } from './collection/collection.component';
import { ResolverService } from './services/resolver.service';
import { ToastrModule } from 'ng6-toastr-notifications';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CreateComponent,
    ReadComponent,
    UpdateComponent,
    DeleteComponent,
    CollectionComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [RouteGuard,ReadService,RouteBlock,ResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
