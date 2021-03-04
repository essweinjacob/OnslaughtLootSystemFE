import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Sweat | Profile");
  }

  resetPassword(){
    const dialogRef = this.dialog.open(ResetPasswordComponent);
  }

}
