import { Component, OnInit } from '@angular/core';
import { ItemEntryService } from '../item-entry.service';
import { ItemEntry, LootSheetUpdate } from '../itemEntry';
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

  roster: Roster[];
  rosterLength: number;

  lootSheetUpdate: LootSheetUpdate[] = [];

  constructor(private itemEntryService: ItemEntryService,
              private rosterAllEntriesService: RosterAllEntriesService) { }

  ngOnInit(): void {
    this.itemEntryService.getItemEntries().subscribe((data: ItemEntry[]) => {
      //console.log(data);
      this.itemEntries = data;
      this.itemEntriesLeng = this.itemEntries.length;
      console.log(this.itemEntriesLeng);
    });

    this.rosterAllEntriesService.getRosterEntries().subscribe((data: Roster[]) => {
      this.roster = data;
      this.rosterLength = this.roster.length;
      console.log(this.roster);
    })
  }

  toggleItemHave(itemEntry: ItemEntry): void{
    for(var i = 0; i < this.itemEntriesLeng; i++){
      if(this.itemEntries[i].charName == itemEntry.charName && this.itemEntries[i].itemName == itemEntry.itemName){
        if(itemEntry.hasItem){
          this.itemEntries[i].hasItem = false;
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).classList.add("doesNotHaveItem");
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).classList.remove("haveItem");
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).innerText = "Does Not Have Item";

          this.lootSheetUpdate.push({charId: this.findIdByName(this.itemEntries[i].charName) , itemName: itemEntry.itemName, prioValue: this.itemEntries[i].prioValue, hasItem: this.itemEntries[i].hasItem});
          this.itemEntryService.updateAttendance(this.lootSheetUpdate).subscribe( () =>{
          })
        }else{
          
          this.itemEntries[i].hasItem = true;
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).classList.add("hasItem");
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).classList.remove("doesNotHaveItem");
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).innerText = "Has Item";

          this.lootSheetUpdate.push({charId: this.findIdByName(this.itemEntries[i].charName) , itemName: itemEntry.itemName, prioValue: this.itemEntries[i].prioValue, hasItem: this.itemEntries[i].hasItem});
          this.itemEntryService.updateAttendance(this.lootSheetUpdate).subscribe( () =>{
          })
        }
      }
    }
  }
    
  findIdByName(givenName: string): number {
    for(var i = 0; i < this.rosterLength; i++){
      if(givenName == this.roster[i].charName){
        return this.roster[i].charId;
      }
    }
  }
}