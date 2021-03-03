import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChangePassword } from 'app/Models/roster';
import { AuthService } from 'app/Services/auth.service';
import { RosterAllEntriesService } from 'app/Services/roster-all-entries.service';
import jwt_decode from 'jwt-decode';

interface tokenObject {
  exp: number,
  iat: number,
  sub: string
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  charName = sessionStorage.getItem('username');

  password: string;
  newPassword: string;
  verifyNewPassword: string;

  constructor(private rosterService: RosterAllEntriesService,
              public dialogRef: MatDialogRef<ResetPasswordComponent>,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  submit(){
    if(this.charName != jwt_decode<tokenObject>(sessionStorage.getItem('token')).sub){
      if(this.password != this.newPassword){
        if(this.newPassword == this.verifyNewPassword){
          let newPassword: ChangePassword = {username: this.charName, oldPassword: this.password, password: this.newPassword};
          this.rosterService.changePassword(newPassword).subscribe(response => {
            if(response){
              this.dialogRef.close();
              window.alert("Password changed successfully");
            }else{
              window.alert("Old Password did not match");
            }
          })
        }else{
          window.alert("Your new password and new verify password do not match");
        }
      }else{
        window.alert("Your current password cannot be the same as your old password");
      }
    }else{
      window.alert("You are looking pretty sus my dude");
      this.authService.logoutUser();
    }
  }
}
