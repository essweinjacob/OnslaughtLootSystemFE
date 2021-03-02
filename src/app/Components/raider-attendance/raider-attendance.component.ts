import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDateDialogComponent } from 'app/Components/add-date-dialog/add-date-dialog.component';
import { Attendance, CharNameAndRoster, AttUpdate, AddAttendance } from 'app/Models/attendance';
import { AttendanceService } from 'app/Services/attendance.service';
import { GetUniqueCharNamesService } from 'app/Services/get-unique-char-name-service.service';
import { GetUniqueRaidDatesService } from 'app/Services/get-unique-raid-dates.service';
import { NotesDialogComponent } from 'app/Components/notes-dialog/notes-dialog.component';
import { UserAuthenticationService } from 'app/Services/user-authentication.service';

@Component({
  selector: 'app-raider-attendance',
  templateUrl: './raider-attendance.component.html',
  styleUrls: ['./raider-attendance.component.css']
})
export class RaiderAttendanceComponent implements OnInit {

  attendances: Attendance[];
  attendanceLength: number;

  uniqueRaidDates: String[];
  uniqueRaidDatesAmount: number;
  uniqueRaidDate: string;

  uniqueCharNames: String[];

  charsAndClasses: CharNameAndRoster[] = [];

  checkBoxText: string;

  raidDateToAdd: string;

  charNameSearch: string;

  addRaidDate: string;

  constructor(private attendanceService: AttendanceService,
              private uniqueAttendanceService: GetUniqueRaidDatesService,
              private uniqueCharNamesService: GetUniqueCharNamesService,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    this.attendanceService.getAttendance().subscribe((data: Attendance[]) => {
      this.attendances = data;
      this.attendanceLength = this.attendances.length;
    });

    this.uniqueAttendanceService.getUniqueRaidDates().subscribe((data: String[]) => {
      this.uniqueRaidDates = data;
      this.uniqueRaidDatesAmount = this.uniqueRaidDates.length;
    })

    this.uniqueCharNamesService.getUniqueCharNames().subscribe((data: String[]) => {
      this.uniqueCharNames = data;
      
      if(this.attendanceLength == undefined){
        this.ngOnInit();
      }
      for(var i = 0; i < this.uniqueCharNames.length; i++){
        for(var j = 0; j < this.attendanceLength; j++){
          if(this.uniqueCharNames[i] == this.attendances[j].charName){
            this.charsAndClasses.push({ charName: this.uniqueCharNames[i], charClass: this.attendances[j].charClass })
            break;
          }
        }
      }
    })
    
  } 

  didPlayerAttend(raidDay: string, charName: string): boolean {
    for(var i = 0; i < this.attendances.length; i++){
      if(this.attendances[i].raidDate == raidDay && this.attendances[i].charName == charName && this.attendances[i].didAttend == true){
        return true;
      } else if(this.attendances[i].raidDate == raidDay && this.attendances[i].charName == charName){
        return false;
      }
    }
    return false;
  }
  
  openNoteDialog(charName: string){
    let dialogRef = this.dialog.open(NotesDialogComponent, {
      data: {charName: charName}
    });
  }
}
