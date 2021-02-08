import { Component, OnInit } from '@angular/core';
import { Attendance, CharNameAndRoster } from '../attendance';
import { AttendanceService } from '../attendance.service';
import { GetUniqueRaidDatesService } from '../get-unique-raid-dates.service';
import { GetUniqueCharNamesService } from '../get-unique-char-name-service.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  attendances: Attendance[];
  attendanceLength: number;

  uniqueRaidDates: String[];
  uniqueRaidDate: string;

  uniqueCharNames: String[];

  charsAndClasses: CharNameAndRoster[] = [];

  checkBoxText: string;

  raidDateToAdd: string;

  constructor(private attendanceService: AttendanceService,
              private uniqueAttendanceService: GetUniqueRaidDatesService,
              private uniqueCharNamesService: GetUniqueCharNamesService) { }

  ngOnInit(): void {
    this.attendanceService.getAttendance().subscribe((data: Attendance[]) => {
      //console.log(data[0].raidDate);
      this.attendances = data;
      //console.log(this.attendances);
      this.attendanceLength = this.attendances.length;
    });

    this.uniqueAttendanceService.getUniqueRaidDates().subscribe((data: String[]) => {
      this.uniqueRaidDates = data;
      //console.log(this.uniqueRaidDates);
    })

    this.uniqueCharNamesService.getUniqueCharNames().subscribe((data: String[]) => {
      this.uniqueCharNames = data;
      //console.log(this.uniqueCharNames);
      
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
    for(var i = 0; i < this.attendances.length; i++){
      if(this.attendances[i].raidDate == raidDay && this.attendances[i].charName == charName && this.attendances[i].didAttend == true){
        this.attendances[i].didAttend = false;
        document.getElementById(charName+raidDay).innerHTML = "X";
      } else if(this.attendances[i].raidDate == raidDay && this.attendances[i].charName == charName){
        this.attendances[i].didAttend = true;
        document.getElementById(charName+raidDay).innerHTML = "&#10003;";
      }
    }
    this.attendanceService.updateAttendance(this.attendances).subscribe( () =>{
    })
  }

  updateAttendance(): void {
    this.attendanceService.updateAttendance(this.attendances).subscribe( () =>{
    })
    window.alert("The attendance has been successfuly updated");
  }
}
