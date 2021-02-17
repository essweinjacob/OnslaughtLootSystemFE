import { Component, OnInit } from '@angular/core';
import { RosterAllEntriesService } from '../../Services/roster-all-entries.service';
import { GetUniqueRaidDatesService } from '../../Services/get-unique-raid-dates.service';
import { Roster } from 'app/Models/roster';
import { AddAttendance } from 'app/Models/attendance';
import { AttendanceService } from '../../Services/attendance.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-user-dialog',
  templateUrl: './add-new-user-dialog.component.html',
  styleUrls: ['./add-new-user-dialog.component.css']
})
export class AddNewUserDialogComponent implements OnInit {

  charName: string;
  charClass: string;
  password: string;
  perms: string;
  role: string;

  uniqueRaidDates: String[];
  uniqueRaidDatesAmount: number;

  roster: Roster[];
  rosterLength: number;

  constructor(private rosterAllEntriesService: RosterAllEntriesService,
              private uniqueRaidDateService: GetUniqueRaidDatesService,
              private attendanceService: AttendanceService,
              public dialogRef: MatDialogRef<AddNewUserDialogComponent>) { }

  ngOnInit(): void {
    this.uniqueRaidDateService.getUniqueRaidDates().subscribe((data: String[]) => {
      this.uniqueRaidDates = data;
      this.uniqueRaidDatesAmount = this.uniqueRaidDates.length;
    })

    this.rosterAllEntriesService.getRosterEntries().subscribe((data: Roster[]) =>{
      this.roster = data;
      this.rosterLength = this.roster.length;
      console.log(this.rosterLength);

    })
  }

  submit(){
    let newUser = {charName: this.charName, charClass: this.charClass,
                   password: this.password, perms: this.perms, role: this.role}
    
    this.rosterAllEntriesService.addNewUser(newUser).subscribe(result =>{
      if(result){
        let id: number;
        id = Number.parseInt(JSON.stringify(result));
        console.log(this.charName, " has been added");
        let newUserRaidDate: AddAttendance[] = [];
        for(var i = 0; i < this.uniqueRaidDatesAmount; i++){
          newUserRaidDate.push({charId: id, raidDate: this.uniqueRaidDates[i].toString()})
        }
        this.attendanceService.addAttendanceForNewUser(newUserRaidDate).subscribe(response => {
          if(response){
            console.log(this.charName, " has been added to raid dates");
            this.dialogRef.close();
          }else{
            console.log("something has gone terrible wrong");
          }
        })
      }else{
        window.alert("User with name " + this.charName + " already exists");
      }
    })
  }
}
