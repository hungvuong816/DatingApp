import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // quick fix
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model )  // return token from server
      .pipe(
        map((response: any) => {                             // 
          const user = response;
          if (user) { // check if something inside here
            localStorage.setItem('token', user.token); // token from API
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            console.log(this.decodedToken);
          }
        })
      );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  } 
}
