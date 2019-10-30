import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // quick fix
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
constructor(private http: HttpClient) { }

 login(model: any){
  return this.http.post(this.baseUrl + 'login', model )  // return token from server
    .pipe(
      map((response: any) =>{                             // 
        const user = response;
        if (user) { // check if something inside here
          localStorage.setItem('token', user.token); // token from API
        }
      })
    );
 }

 register(model: any) {
   return this.http.post(this.baseUrl + 'register', model);
 }
}
