import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Attendance, CharNameAndRoster, AttUpdate, AddAttendance } from 'app/Models/attendance';
import { AttendanceService } from 'app/Services/attendance.service';
import { GetUniqueCharNamesService } from 'app/Services/get-unique-char-name-service.service';
import { GetUniqueRaidDatesService } from 'app/Services/get-unique-raid-dates.service';
import { NotesDialogComponent } from 'app/Components/notes-dialog/notes-dialog.component';
import { Title } from '@angular/platform-browser';

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
              public dialog: MatDialog,
              private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Sweat | Attendance");
    this.attendanceService.getAttendance().subscribe((data: Attendance[]) => {
      this.attendances = data;
      this.attendanceLength = this.attendances.length;
      console.log(this.attendanceLength);

      this.uniqueAttendanceService.getUniqueRaidDates().subscribe((data: String[]) => {
        this.uniqueRaidDates = data;
        this.uniqueRaidDatesAmount = this.uniqueRaidDates.length;
      })

      this.uniqueCharNamesService.getUniqueCharNames().subscribe((response: String[]) =>{
        this.uniqueCharNames = response;
        //console.log(this.uniqueCharNames)
      })
    });
  } 

  didPlayerAttend(raidDay: string, charName: string): boolean {
    for(var i = 0; i < this.attendances.length; i++){
      if(this.attendances[i].raidDate == raidDay && this.attendances[i].charName == charName && this.attendances[i].didAttend == true){
        console.log("here")
        return true;
      } else if(this.attendances[i].raidDate == raidDay && this.attendances[i].charName == charName){
        console.log("here");
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
