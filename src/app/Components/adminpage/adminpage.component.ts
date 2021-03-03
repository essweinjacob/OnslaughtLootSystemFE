import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Roster } from 'app/Models/roster';
import { UserAuthenticationService } from 'app/Services/user-authentication.service';
import { AddNewUserDialogComponent } from '../add-new-user-dialog/add-new-user-dialog.component';
import { CleanLootSheetVerifyComponent } from '../clean-loot-sheet-verify/clean-loot-sheet-verify.component';
import { RemoveUserDialogComponent } from '../remove-user-dialog/remove-user-dialog.component';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private userAuth: UserAuthenticationService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.userAuth.verifyUsers();
  }

  newUser: Roster;

  addNewUser(){
    const dialogRef = this.dialog.open(AddNewUserDialogComponent);
  }

  removeUser(){
    const dialogRef = this.dialog.open(RemoveUserDialogComponent);
  }

  cleanLootsheet(){
    const dialogRef = this.dialog.open(CleanLootSheetVerifyComponent);
  }
}
