import { Component, OnInit } from '@angular/core';
import { ItemEntryService } from '../../Services/item-entry.service';
import { ItemEntry, LootSheetUpdate, ItemEntryUpdate } from '../../Models/itemEntry';
import { RosterAllEntriesService } from '../../Services/roster-all-entries.service';
import { NameWithAttendance } from '../../Models/attendance';
import { UserAuthenticationService } from 'app/Services/user-authentication.service';
import { Title } from '@angular/platform-browser';
import { AttendanceService } from 'app/Services/attendance.service';

@Component({
  selector: 'app-item-entry',
  templateUrl: './item-entry.component.html',
  styleUrls: ['./item-entry.component.css']
})
export class ItemEntryComponent implements OnInit {
  
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
              private userAuth: UserAuthenticationService,
              private titleService: Title,
              private attendanceService: AttendanceService) { }

  ngOnInit(): void {
    this.titleService.setTitle("Sweat | Admin Loot Sheet");
    this.userAuth.verifyUsers();
    
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

  toggleItemHave(itemEntry: ItemEntryUpdate): void{
    var itemUpdate: LootSheetUpdate = {charName: 'null', itemName: "None", prioValue: 0, hasItem: true};
    for(var i = 0; i < this.itemEntriesLeng; i++){
      if(this.itemEntrySortedOnCalculatedValues[i].charName == itemEntry.charName && this.itemEntrySortedOnCalculatedValues[i].itemName == itemEntry.itemName && this.itemEntrySortedOnCalculatedValues[i].prioValue == itemEntry.prioValue){
        if(itemEntry.hasItem){
          this.itemEntrySortedOnCalculatedValues[i].hasItem = false;
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).classList.add("doesNotHaveItem");
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).classList.remove("haveItem");
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).innerText = "Does Not Have Item";

          itemUpdate = {charName: itemEntry.charName, itemName: itemEntry.itemName, prioValue: this.itemEntrySortedOnCalculatedValues[i].prioValue, hasItem: this.itemEntrySortedOnCalculatedValues[i].hasItem}; 
          this.itemEntryService.updateItem(itemUpdate).subscribe( () =>{
          })
        }else{
          
          this.itemEntrySortedOnCalculatedValues[i].hasItem = true;
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).classList.add("hasItem");
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).classList.remove("doesNotHaveItem");
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).innerText = "Has Item";

          itemUpdate = {charName: itemEntry.charName , itemName: itemEntry.itemName, prioValue: this.itemEntrySortedOnCalculatedValues[i].prioValue, hasItem: this.itemEntrySortedOnCalculatedValues[i].hasItem};
          this.itemEntryService.updateItem(itemUpdate).subscribe( () =>{
          })
        }
      }
    }
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
    return Math.floor(baseValue + ((raidsAttended * 0.4) + (raidsAttended/this.totalRaidCount * 10)));
  }

  togglePlusOne(itemEntry: ItemEntryUpdate): void{
    var itemUpdate: LootSheetUpdate = {charName: "null", itemName: "None", prioValue: 0, hasItem: true};
    for(var i = 0; i < this.itemEntriesLeng; i++){
      if(this.itemEntrySortedOnCalculatedValues[i].charName == itemEntry.charName && this.itemEntrySortedOnCalculatedValues[i].itemName == itemEntry.itemName && this.itemEntrySortedOnCalculatedValues[i].prioValue == itemEntry.prioValue){
        if(!this.itemEntrySortedOnCalculatedValues[i].hasPlusOne){
          this.itemEntrySortedOnCalculatedValues[i].hasPlusOne = true;
          itemUpdate = {charName: itemEntry.charName, itemName: itemEntry.itemName, prioValue: this.itemEntrySortedOnCalculatedValues[i].prioValue + 1, hasItem: this.itemEntrySortedOnCalculatedValues[i].hasItem};
          this.itemEntryService.updatePrioValue(itemUpdate).subscribe( () =>{
          })
        }else{
          itemUpdate = {charName: itemEntry.charName, itemName: itemEntry.itemName, prioValue: this.itemEntrySortedOnCalculatedValues[i].prioValue, hasItem: this.itemEntrySortedOnCalculatedValues[i].hasItem};
          this.itemEntrySortedOnCalculatedValues[i].hasPlusOne = false;
          this.itemEntryService.updatePrioValue(itemUpdate).subscribe( () =>{
          })
        }
      }
    }
  }
}