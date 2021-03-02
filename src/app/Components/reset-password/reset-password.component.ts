import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChangePassword } from 'app/Models/roster';
import { RosterAllEntriesService } from 'app/Services/roster-all-entries.service';

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
    public dialogRef: MatDialogRef<ResetPasswordComponent>) { }

  ngOnInit(): void {
  }

  submit(){
    if(this.password != this.newPassword){
      if(this.newPassword == this.verifyNewPassword){
        let newPassword: ChangePassword = {charName: this.charName, password: this.newPassword};
        this.rosterService.changePassword(newPassword).subscribe(response => {
          if(response){
            this.dialogRef.close();
          }else{
            window.alert("Something went terribly wrong");
          }
        })
      }else{
        window.alert("Your new password and new verify password do not match");
      }
    }else{
      window.alert("Your current password cannot be the same as your old password");
    }
  }
}
