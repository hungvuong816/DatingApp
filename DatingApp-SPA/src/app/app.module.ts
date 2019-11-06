import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';  // manually type 
import {BsDropdownModule } from 'ngx-bootstrap'; // npm install ngx-bootstrap@3.0.1 --save
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';


import { AuthService } from './_services/auth.service'; // quick fix after added provider
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { appRoute } from './routes';


@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MessagesComponent,
      ListsComponent,
      MemberListComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoute)
   ],
   providers: [
      ErrorInterceptorProvider,
      AuthService//addeditaftergeneratingservice
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
