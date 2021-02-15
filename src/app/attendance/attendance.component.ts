import { Component, HostListener, OnInit } from '@angular/core';
import { Attendance, CharNameAndRoster, AddAttendance, AttUpdate } from '../attendance';
import { AttendanceService } from '../attendance.service';
import { GetUniqueRaidDatesService } from '../get-unique-raid-dates.service';
import { GetUniqueCharNamesService } from '../get-unique-char-name-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDateDialogComponent } from '../add-date-dialog/add-date-dialog.component';
import { NotesDialogComponent } from '../notes-dialog/notes-dialog.component';


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
      //console.log(this.attendanceLength);
    });

    this.uniqueAttendanceService.getUniqueRaidDates().subscribe((data: String[]) => {
      this.uniqueRaidDates = data;
      //console.log(this.uniqueRaidDates);
      this.uniqueRaidDatesAmount = this.uniqueRaidDates.length;
    })

    this.uniqueCharNamesService.getUniqueCharNames().subscribe((data: String[]) => {
      this.uniqueCharNames = data;
      //console.log(this.uniqueCharNames);
      
      if(this.attendanceLength == undefined){
        this.ngOnInit();
      }
      for(var i = 0; i < this.uniqueCharNames.length; i++){
        for(var j = 0; j < this.attendanceLength; j++){
          //console.log(this.uniqueCharNames[i], ": ", i, this.attendances[j].charName, ": ", );
          if(this.uniqueCharNames[i] == this.attendances[j].charName){
            this.charsAndClasses.push({ charName: this.uniqueCharNames[i], charClass: this.attendances[j].charClass })
            break;
          }
        }
      }

      //console.log(this.charsAndClasses);
    })
    
  } 

  didPlayerAttend(raidDay: string, charName: string): boolean {
    //console.log("here");
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
    let attUpdate: AttUpdate = {charId: 0, raidDate: "0/0", didAttend: true};
    for(var i = 0; i < this.attendances.length; i++){
      if(this.attendances[i].raidDate == raidDay && this.attendances[i].charName == charName && this.attendances[i].didAttend == true){
        this.attendances[i].didAttend = false;
        document.getElementById(charName+raidDay).innerHTML = "";
        attUpdate.charId = this.attendances[i].charId;
        attUpdate.raidDate = raidDay;
        attUpdate.didAttend = false;
      } else if(this.attendances[i].raidDate == raidDay && this.attendances[i].charName == charName){
        this.attendances[i].didAttend = true;
        document.getElementById(charName+raidDay).innerHTML = "&#10003;";
        attUpdate.charId = this.attendances[i].charId;
        attUpdate.raidDate = raidDay;
        attUpdate.didAttend = true;
      }
    }
    //console.log(attUpdate);
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
      for(var i = 0; i <= this.uniqueCharNames.length; i++){
        addNewAttendance.push({ charId: i, raidDate: splitDate })
      }
      this.attendanceService.addAttendanceDate(addNewAttendance).subscribe( () =>{
      })
      location.reload();
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
