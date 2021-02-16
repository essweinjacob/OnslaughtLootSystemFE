import { Component, OnInit } from '@angular/core';
import { ItemEntryService } from '../item-entry.service';
import { ItemEntry, LootSheetUpdate, ItemEntryUpdate } from '../itemEntry';
import { RosterAllEntriesService } from '../roster-all-entries.service';
import { Roster } from '../roster';

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
                                                        hasItem: this.itemEntries[i].hasItem,
                                                        hasPlusOne: false});
      }
      
      this.itemEntrySortedOnCalculatedValues.sort((a,b) => b.prioValueCalc - a.prioValueCalc);
      this.itemEntrySortedOnCalculatedValues.sort((a,b) => Number(a.hasItem) - Number(b.hasItem));      
    });
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