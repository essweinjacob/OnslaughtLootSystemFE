import { Component, OnInit } from '@angular/core';
import { ItemEntryService } from '../item-entry.service';
import { ItemEntry, LootSheetUpdate, ItemEntryUpdate } from '../itemEntry';
import { RosterAllEntriesService } from '../roster-all-entries.service';
import { Roster } from '../roster';

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

  roster: Roster[];
  rosterLength: number;

  lootSheetUpdate: LootSheetUpdate[] = [];

  totalRaidCount: number = 0;

  constructor(private itemEntryService: ItemEntryService,
              private rosterAllEntriesService: RosterAllEntriesService) { }

  ngOnInit(): void {
    this.rosterAllEntriesService.getRosterEntries().subscribe((data: Roster[]) => {
      this.roster = data;
      //console.log("here",this.roster);
      this.rosterLength = this.roster.length;
      //console.log(this.rosterLength);

      // Get the max amount of raids
      for(var i = 0; i < this.rosterLength; i++){
        if(this.roster[i].attendCount > this.totalRaidCount){
          this.totalRaidCount = this.roster[i].attendCount;
        }
      }
    });
    
    this.itemEntryService.getItemEntries().subscribe((data: ItemEntry[]) => {
      this.itemEntries = data;
      this.itemEntriesLeng = this.itemEntries.length;

      for(var i = 0; i < this.itemEntries.length; i++){
        this.itemEntrySortedOnCalculatedValues.push({charId: this.itemEntries[i].charId,
                                                        charName: this.itemEntries[i].charName,
                                                        itemName: this.itemEntries[i].itemName,
                                                        prioValue: this.itemEntries[i].prioValue,
                                                        prioValueCalc: this.getPrioValue(this.itemEntries[i]),
                                                        hasItem: this.itemEntries[i].hasItem});
      }
      
      this.itemEntrySortedOnCalculatedValues.sort((a,b) => b.prioValueCalc - a.prioValueCalc);
      this.itemEntrySortedOnCalculatedValues.sort((a,b) => Number(a.hasItem) - Number(b.hasItem));      
    });
  }

  toggleItemHave(itemEntry: ItemEntryUpdate): void{
    var itemUpdate: LootSheetUpdate = {charId: 0, itemName: "None", prioValue: 0, hasItem: true};
    for(var i = 0; i < this.itemEntriesLeng; i++){
      if(this.itemEntrySortedOnCalculatedValues[i].charName == itemEntry.charName && this.itemEntrySortedOnCalculatedValues[i].itemName == itemEntry.itemName){
        if(itemEntry.hasItem){
          this.itemEntrySortedOnCalculatedValues[i].hasItem = false;
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).classList.add("doesNotHaveItem");
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).classList.remove("haveItem");
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).innerText = "Does Not Have Item";

          itemUpdate = {charId: this.findIdByName(this.itemEntrySortedOnCalculatedValues[i].charName) , itemName: itemEntry.itemName, prioValue: this.itemEntrySortedOnCalculatedValues[i].prioValue, hasItem: this.itemEntrySortedOnCalculatedValues[i].hasItem};
          //console.log(itemUpdate);  
          this.itemEntryService.updateItem(itemUpdate).subscribe( () =>{
          })
        }else{
          
          this.itemEntrySortedOnCalculatedValues[i].hasItem = true;
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).classList.add("hasItem");
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).classList.remove("doesNotHaveItem");
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).innerText = "Has Item";

          itemUpdate = {charId: this.findIdByName(this.itemEntrySortedOnCalculatedValues[i].charName) , itemName: itemEntry.itemName, prioValue: this.itemEntrySortedOnCalculatedValues[i].prioValue, hasItem: this.itemEntrySortedOnCalculatedValues[i].hasItem};
          //console.log(itemUpdate);
          this.itemEntryService.updateItem(itemUpdate).subscribe( () =>{
          })
        }
      }
    }
  }

  getPrioValue(itemObj: ItemEntry): number{
    var baseValue = itemObj.prioValue;
    //console.log(baseValue);
    var raidsAttended = 0;
    //console.log(this.rosterLength);
    for(var i = 0; i < this.rosterLength; i++){
      if(itemObj.charName == this.roster[i].charName){
        raidsAttended = this.roster[i].attendCount;
        //console.log(raidsAttended);
        break;
      }else{
        //console.log(this.roster[i].charName);
      }
    }
    //console.log(Math.floor(baseValue + ((this.totalRaidCount * 0.4) + (raidsAttended/this.totalRaidCount * 0.1))))
    return Math.floor(baseValue + ((this.totalRaidCount * 0.4) + (raidsAttended/this.totalRaidCount * 0.1)));
  }
    
  findIdByName(givenName: string): number {
    //console.log(givenName);
    for(var i = 0; i < this.rosterLength; i++){
      //console.log(givenName, this.roster[i].charName);
      if(givenName == this.roster[i].charName){
        //console.log("here");
        return this.roster[i].charId;
      }
    }
  }
}