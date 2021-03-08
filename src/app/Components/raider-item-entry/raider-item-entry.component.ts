import { Component, OnInit } from '@angular/core';
import { ItemEntryService } from '../../Services/item-entry.service';
import { ItemEntry, LootSheetUpdate, ItemEntryUpdate } from '../../Models/itemEntry';
import { RosterAllEntriesService } from '../../Services/roster-all-entries.service';
import { Roster } from '../../Models/roster';
import { Title } from '@angular/platform-browser';
import { AttendanceService } from 'app/Services/attendance.service';
import { NameWithAttendance } from 'app/Models/attendance';

@Component({
  selector: 'app-item-entry',
  templateUrl: './raider-item-entry.component.html',
  styleUrls: ['./raider-item-entry.component.css']
})
export class RaiderItemEntryComponent implements OnInit {
  
  itemEntries: ItemEntry[];
  itemName: string;
  itemEntriesLeng: number;

  charName: number;

  itemEntrySortedOnCalculatedValues: ItemEntryUpdate[] = [];

  nameWithAttendance: NameWithAttendance[] = [];
  nameWithAttendanceLength: number;

  lootSheetUpdate: LootSheetUpdate[] = [];

  totalRaidCount: number = 0;

  constructor(private itemEntryService: ItemEntryService,
              private rosterAllEntriesService: RosterAllEntriesService,
              private titleService: Title,
              private attendanceService: AttendanceService) { }

  ngOnInit(): void {
    this.titleService.setTitle("Sweat | Loot Sheet");
    
    this.itemEntryService.getItemEntries().subscribe((data: ItemEntry[]) => {
      this.itemEntries = data;
      this.itemEntriesLeng = this.itemEntries.length;

      this.attendanceService.getAttendanceCount().subscribe((data: NameWithAttendance[]) => {
        this.nameWithAttendance = data;
        this.nameWithAttendanceLength = data.length;

        for(var i = 0; i < this.nameWithAttendanceLength; i++){
          if(this.nameWithAttendance[i].raidsAttended > this.totalRaidCount){
            this.totalRaidCount = this.nameWithAttendance[i].raidsAttended;
          }
        }

      for(var i = 0; i < this.itemEntries.length; i++){
        this.itemEntrySortedOnCalculatedValues.push({charId: this.itemEntries[i].charId,
                                                        charName: this.itemEntries[i].charName,
                                                        itemName: this.itemEntries[i].itemName,
                                                        prioValue: this.itemEntries[i].prioValue,
                                                        prioValueCalc: this.getPrioValue(this.itemEntries[i]),
                                                        hasItem: this.itemEntries[i].hasItem,
                                                        hasPlusOne: false});
      }
    })
      
      this.itemEntrySortedOnCalculatedValues.sort((a,b) => b.prioValueCalc - a.prioValueCalc);
      this.itemEntrySortedOnCalculatedValues.sort((a,b) => Number(a.hasItem) - Number(b.hasItem));      
    });
  }

  getPrioValue(itemObj: ItemEntry): number{
    var baseValue = itemObj.prioValue;
    var raidsAttended = 0;
    for(var i = 0; i < this.nameWithAttendanceLength; i++){
      if(itemObj.charName == this.nameWithAttendance[i].charName){
        raidsAttended = this.nameWithAttendance[i].raidsAttended;
        break;
      }
    }
    console.log(raidsAttended, this.totalRaidCount);
    return Math.floor(baseValue + ((raidsAttended * 0.4) + (raidsAttended/this.totalRaidCount) * 10));
  }
}