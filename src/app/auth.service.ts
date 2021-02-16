import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RosterAllEntriesService } from './roster-all-entries.service';
import { Roster } from './roster';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  loggedInStatus = false;
  constructor(private http: HttpClient,
              private router: Router,
              private rosterAllEntriesService: RosterAllEntriesService) { }

  getUserDetails(charName: string, password: string){
    return this.http.post('http://localhost:8080/api/auth', {
      charName,
      password
    }).subscribe(data =>{
      if(data){
        this.loggedInStatus = true;
        localStorage.setItem('loggedIn', 'true');
        this.router.navigate(['/']);
        this.getPerms(charName);
      }else{
        this.loggedInStatus = false;
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('admin');
        window.alert("Incorrect login information");
      }
    })
  }

  loggedIn(){
    return localStorage.getItem('loggedIn');
  }

  getPerms(charName: string){
    return this.http.post('http://localhost:8080/api/roleAuth', {
      charName
    }).subscribe(data =>{
      if(data){
        localStorage.setItem('admin','true');
      }else{
        localStorage.removeItem('admin');
      }
    })
  }

  isAdmin(){
    return localStorage.getItem('admin');
  }

  logoutUser(){
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('admin');
    this.router.navigate(['login']);
  }
}
