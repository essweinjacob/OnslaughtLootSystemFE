import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/Services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private Auth: AuthService,
              private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Sweat | Login");
  }

  loginUser(){
    const charName = this.username;
    const password = this.password;

    this.Auth.getUserDetails(charName, password);
  }
}
