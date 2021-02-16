import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInStatus = false;
  constructor(private http: HttpClient,
              private router: Router) { }

  getUserDetails(charName: string, password: string){
    return this.http.post('http://localhost:8080/api/auth', {
      charName,
      password
    }).subscribe(data =>{
      if(data){
        this.loggedInStatus = true;
        localStorage.setItem('loggedIn', 'true');
        this.router.navigate(['/']);
      }else{
        this.loggedInStatus = false;
        window.alert("Incorrect login information")
      }
    })
  }
}
