import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private Auth: AuthService) { }

  ngOnInit(): void {
  }

  loginUser(){
    const charName = this.username;
    const password = this.password;

    this.Auth.getUserDetails(charName, password);
  }
}
