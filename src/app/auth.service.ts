import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getUserDetails(charName: string, password: string){
    return this.http.post('http://localhost:8080/api/auth', {
      charName,
      password
    }).subscribe(data =>{
      console.log(data) 
    })
  }
}
