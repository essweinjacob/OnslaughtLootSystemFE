import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddDateDialogComponent } from 'app/add-date-dialog/add-date-dialog.component';
import { UpdateNote } from 'app/roster';
import { RosterAllEntriesService } from '../roster-all-entries.service';

@Component({
  selector: 'app-notes-dialog',
  templateUrl: './notes-dialog.component.html',
  styleUrls: ['./notes-dialog.component.css']
})
export class NotesDialogComponent implements OnInit {

  note: string;
  
  constructor(public dialogRef: MatDialogRef<AddDateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private rosterAllEntriesService: RosterAllEntriesService) { }

  ngOnInit(): void {
    this.rosterAllEntriesService.getNotesByName(this.data.charName).subscribe((data: any) =>{
      this.note = data;
      console.log(this.note);
    })
  }

  updateNote(){
    let updateNote: UpdateNote = {charName: this.data.charName, notes: this.note};
    console.log(this.note);
    this.rosterAllEntriesService.updateNote(updateNote).subscribe( () =>{
    })
  }

}
