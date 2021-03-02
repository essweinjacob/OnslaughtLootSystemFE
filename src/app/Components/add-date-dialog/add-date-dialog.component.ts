import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from 'app/Services/user-authentication.service';

@Component({
  selector: 'app-add-date-dialog',
  templateUrl: './add-date-dialog.component.html',
  styleUrls: ['./add-date-dialog.component.css']
})
export class AddDateDialogComponent implements OnInit {

  givenDate: string;
  
  constructor(private userAuth: UserAuthenticationService) { }

  ngOnInit(): void {
    this.userAuth.verifyUsers();
  }

}
