import { Component, HostListener, OnInit } from '@angular/core';
import { Attendance, CharNameAndRoster, AddAttendance, AttUpdate } from '../../Models/attendance';
import { AttendanceService } from '../../Services/attendance.service';
import { GetUniqueRaidDatesService } from '../../Services/get-unique-raid-dates.service';
import { GetUniqueCharNamesService } from '../../Services/get-unique-char-name-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDateDialogComponent } from '../add-date-dialog/add-date-dialog.component';
import { NotesDialogComponent } from '../notes-dialog/notes-dialog.component';
import { UserAuthenticationService } from 'app/Services/user-authentication.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  attendances: Attendance[];
  attendanceLength: number;

  uniqueRaidDates: String[];
  uniqueRaidDatesAmount: number;
  uniqueRaidDate: string;

  uniqueCharNames: String[];

  checkBoxText: string;

  raidDateToAdd: string;

  charNameSearch: string;

  addRaidDate: string;

  constructor(private attendanceService: AttendanceService,
              private uniqueAttendanceService: GetUniqueRaidDatesService,
              private uniqueCharNamesService: GetUniqueCharNamesService,
              public dialog: MatDialog,
              private userAuth: UserAuthenticationService,
              private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Sweat | Admin Attendance");
    this.userAuth.verifyUsers();
    this.attendanceService.getAttendance().subscribe((data: Attendance[]) => {
      this.attendances = data;
      this.attendanceLength = this.attendances.length;

      this.uniqueAttendanceService.getUniqueRaidDates().subscribe((data: String[]) => {
        this.uniqueRaidDates = data;
        this.uniqueRaidDatesAmount = this.uniqueRaidDates.length;
      })

      this.uniqueCharNamesService.getUniqueCharNames().subscribe((response: String[]) =>{
        this.uniqueCharNames = response;
        console.log(this.uniqueCharNames)
      })
    });
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

  toggleTrueFalse(raidDay: string, charName: string): void {
    let attUpdate: AttUpdate = {charName: charName, raidDate: "0/0", didAttend: true};
    for(var i = 0; i < this.attendances.length; i++){
      if(this.attendances[i].raidDate == raidDay && this.attendances[i].charName == charName && this.attendances[i].didAttend == true){
        this.attendances[i].didAttend = false;
        document.getElementById(charName+raidDay).innerHTML = "";
        attUpdate.charName = this.attendances[i].charName;
        attUpdate.raidDate = raidDay;
        attUpdate.didAttend = false;
      } else if(this.attendances[i].raidDate == raidDay && this.attendances[i].charName == charName){
        this.attendances[i].didAttend = true;
        document.getElementById(charName+raidDay).innerHTML = "&#10003;";
        attUpdate.charName = this.attendances[i].charName;
        attUpdate.raidDate = raidDay;
        attUpdate.didAttend = true;
      }
    }
    this.attendanceService.updateAttendance(attUpdate).subscribe( () =>{
    })
  }

  addDateDialog(): void {
    let dialogRef = this.dialog.open(AddDateDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      var splitDate = result.split("-");
      splitDate = splitDate[1] + "/" + splitDate[2] +  "/" + splitDate[0];
      for(var i = 0; i < this.uniqueRaidDates.length; i++){
        if(splitDate == this.uniqueRaidDates[i]){
          window.alert("This raid date already exists");
          return;
        }
      }
      // Create a attendance object list with character id
      let addNewAttendance: AddAttendance[] = [];
      for(var i = 0; i < this.uniqueCharNames.length; i++){
        addNewAttendance.push({ charName: this.uniqueCharNames[i], raidDate: splitDate })
      }
      location.reload()
      this.attendanceService.addAttendanceDate(addNewAttendance).subscribe( () =>{
      })
    })
  }

  removeDateDialog(): void {
    let dialogRef = this.dialog.open(AddDateDialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      var splitDate = result.split("-");
      splitDate = splitDate[1] + "/" + splitDate[2] +  "/" + splitDate[0];
      for(var i = 0; i <= this.uniqueRaidDates.length; i++){
        if(splitDate == this.uniqueRaidDates[i]){
          this.attendanceService.removeAttendanceDate(splitDate).subscribe( () =>{
          })
          location.reload();
          return;
        }
      }
      window.alert("This raid date does not exist");
    })
  }

  openNoteDialog(charName: string){
    let dialogRef = this.dialog.open(NotesDialogComponent, {
      data: {charName: charName}
    });
  }
}
