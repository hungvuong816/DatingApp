import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';  // manually type 
import {BsDropdownModule } from 'ngx-bootstrap'; // npm install ngx-bootstrap@3.0.1 --save

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service'; // quick fix after added provider
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,  //importaftertypeinnav.components.ts\\nimportHomeComponentfrom'./home/home.component';
      BsDropdownModule.forRoot() // npm install ngx-bootstrap@3.0.1 --save
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
