import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser'; // this to fix angular customhammerconfig compatibility//
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';  // manually type 
import {BsDropdownModule, TabsModule } from 'ngx-bootstrap'; // npm install ngx-bootstrap@3.0.1 --save
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';



import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';


import { AuthService } from './_services/auth.service'; // quick fix after added provider
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { appRoute } from './routes';
import { UserService } from './_services/user.service';
import { AuthGuard } from './_guard/auth.guard';
import { AlertifyService } from './_services/alertify.service';
import { MemberDetailResolver } from './_resolvers/member-detail-resolver';
import { MemberListResolver } from './_resolvers/member-list-resolver';

export function tokenGetter() {            // JWtModule to send up Token autometically
   return localStorage.getItem('token');
}

export class CustomHammerConfig extends HammerGestureConfig  { // this to fix angular customhammerconfig compatibility//
   overrides = {
       pinch: { enable: false },
       rotate: { enable: false }
   };
}

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
      MemberCardComponent,
      MemberDetailComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoute),
      NgxGalleryModule, // this to fix angular customhammerconfig compatibility//
      JwtModule.forRoot({                          // JWtModule to send up Token autometically
         config: {
            tokenGetter,                           // tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      ErrorInterceptorProvider,
      AuthService,//addeditaftergeneratingservice
      UserService,
      AuthGuard,
      AlertifyService,
      MemberDetailResolver,
      MemberListResolver,
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
