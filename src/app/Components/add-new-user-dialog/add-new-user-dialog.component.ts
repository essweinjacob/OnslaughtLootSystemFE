import { Component, OnInit } from '@angular/core';
import { RosterAllEntriesService } from '../../Services/roster-all-entries.service';
import { GetUniqueRaidDatesService } from '../../Services/get-unique-raid-dates.service';
import { Roster } from 'app/Models/roster';
import { AddAttendance } from 'app/Models/attendance';
import { AttendanceService } from '../../Services/attendance.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserAuthenticationService } from 'app/Services/user-authentication.service';
import { UserRepositoryService } from 'app/Services/user-repository.service';

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
              public dialogRef: MatDialogRef<AddNewUserDialogComponent>,
              private userAuth: UserAuthenticationService,
              private userRepositoryService: UserRepositoryService) { }

  ngOnInit(): void {
    this.userAuth.verifyUsers();
    
    this.uniqueRaidDateService.getUniqueRaidDates().subscribe((data: String[]) => {
      this.uniqueRaidDates = data;
      this.uniqueRaidDatesAmount = this.uniqueRaidDates.length;
    })

    this.rosterAllEntriesService.getRosterEntries().subscribe((data: Roster[]) =>{
      this.roster = data;
      this.rosterLength = this.roster.length;
    })
  }

  submit(){
    let newRosterUser = {charName: this.charName, charClass: this.charClass, role: this.role}
    
    // Add to roster
    this.rosterAllEntriesService.addNewUser(newRosterUser).subscribe(result =>{
      if(result){
        let id: number;
        id = Number.parseInt(JSON.stringify(result));
        let newUserRaidDate: AddAttendance[] = [];
        for(var i = 0; i < this.uniqueRaidDatesAmount; i++){
          newUserRaidDate.push({charId: id, raidDate: this.uniqueRaidDates[i].toString()})
        }
        
        // Add to attendance
        this.attendanceService.addAttendanceForNewUser(newUserRaidDate).subscribe(response => {
          if(!response){
            window.alert("Adding attendance failed")
          }
        })

        let newUser = {username: this.charName, perms: this.perms, password: this.password}
        this.userRepositoryService.addNewUser(newUser).subscribe(data => {
          if(data){
            window.alert("User has been added");
            this.dialogRef.close();
          }else{
            window.alert("Adding user to users repoistiory failed");
          }
        })
      }else{
        window.alert("User with name " + this.charName + " already exists");
      }
    })
  }
}
