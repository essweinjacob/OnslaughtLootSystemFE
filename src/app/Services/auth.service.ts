import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RosterAllEntriesService } from './roster-all-entries.service';
import { Roster } from '../Models/roster';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  loggedInStatus = false;
  constructor(private http: HttpClient,
              private router: Router,
              private rosterAllEntriesService: RosterAllEntriesService) { }

  getUserDetails(username: string, password: string){
    return this.http.post<any>('http://localhost:8080/authenticate', {
      username,
      password
    }).subscribe((data:any) =>{
      if(data.token){
        this.loggedInStatus = true;
        sessionStorage.setItem('username', username);
        let tokenStr = 'Bearer ' + data.token;
        sessionStorage.setItem('token', tokenStr);
        this.router.navigate(['/']);
        this.http.post<any>('http://localhost:8080/api/isAdmin', {username}).subscribe(data => {
          if(data){
            sessionStorage.setItem('admin', "true");
          }
        })
      return data;
      }else{
        this.loggedInStatus = false;
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('admin');
        window.alert("Incorrect login information");
      }
    })
  }

  loggedIn(){
    return sessionStorage.getItem('token');
  }

  isAdmin(){
    return sessionStorage.getItem('admin');
  }
  
  logoutUser(){
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('admin');
    this.router.navigate(['login']);
  }
}
