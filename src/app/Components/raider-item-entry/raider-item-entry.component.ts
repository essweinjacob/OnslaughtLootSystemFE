import { Component, OnInit } from '@angular/core';
import { ItemEntryService } from '../../Services/item-entry.service';
import { ItemEntry, LootSheetUpdate, ItemEntryUpdate } from '../../Models/itemEntry';
import { RosterAllEntriesService } from '../../Services/roster-all-entries.service';
import { Roster } from '../../Models/roster';

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
      this.rosterLength = this.roster.length;

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
    var raidsAttended = 0;
    for(var i = 0; i < this.rosterLength; i++){
      if(itemObj.charName == this.roster[i].charName){
        raidsAttended = this.roster[i].attendCount;
        break;
      }
    }
    return Math.floor(baseValue + ((raidsAttended * 0.4) + (raidsAttended/this.totalRaidCount * 0.1)));
  }
    
  findIdByName(givenName: string): number {
    for(var i = 0; i < this.rosterLength; i++){
      if(givenName == this.roster[i].charName){
        return this.roster[i].charId;
      }
    }
  }
}