import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RosterAllEntriesService } from 'app/Services/roster-all-entries.service';

@Component({
  selector: 'app-remove-user-dialog',
  templateUrl: './remove-user-dialog.component.html',
  styleUrls: ['./remove-user-dialog.component.css']
})
export class RemoveUserDialogComponent implements OnInit {

  charName: string;

  constructor(private rosterService: RosterAllEntriesService,
              private dialogRef: MatDialogRef<RemoveUserDialogComponent>) { }

  ngOnInit(): void {
  }

  submit(){
    this.rosterService.removeUser(this.charName).subscribe(result =>{
      if(result){
        window.alert("Character " + this.charName + " has been deleted from all data bases");
        this.dialogRef.close();
      }else{
        window.alert("Character " + this.charName + " does not exists");
      }
    })
  }

}
