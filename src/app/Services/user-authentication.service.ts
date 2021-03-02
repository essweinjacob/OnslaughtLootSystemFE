import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { AuthService } from './auth.service';

interface tokenObject {
  exp: number,
  iat: number,
  sub: string
}

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  constructor(private authService: AuthService,
              private http: HttpClient) { }

  verifyUsers(){
    try{
      if(sessionStorage.getItem('username') != jwt_decode<tokenObject>(sessionStorage.getItem('token')).sub){
        window.alert("You are looking pretty sus my dude");
        this.authService.logoutUser();
      }else{
        let username = sessionStorage.getItem('username');
        this.http.post<any>('http://localhost:8080/api/isAdmin', {username}).subscribe(data => {
          if(!data){
            window.alert("You are looking pretty sus my dude");
            this.authService.logoutUser();
          }
        })
      }
    }catch(Error){

    }
  }
}
