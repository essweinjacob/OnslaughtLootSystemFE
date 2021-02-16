import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'sweat-frontend';

  loginStatus = false
  constructor(private auth: AuthService){}

  ngOnInit(){
    if(localStorage.getItem("loggedIn") == 'true'){
      this.loginStatus = true;
    }else{
      this.loginStatus = false;
    }
  }
}
