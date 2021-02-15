import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  username = "testname"
  password = ''
  invalidLogin = false

  constructor(private router: Router,
              private loginService: AuthenticationService) { }

  ngOnInit(): void {
  }

  checkLogin(){
    if(this.loginService.authenticate(this.username, this.password)){
      this.router.navigate([''])
      this.invalidLogin = false
    }else{
      this.invalidLogin = true
    }
  }

}
