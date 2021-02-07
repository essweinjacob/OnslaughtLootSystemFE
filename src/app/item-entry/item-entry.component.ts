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
    });

    this.rosterAllEntriesService.getRosterEntries().subscribe((data: Roster[]) => {
      this.roster = data;
      this.rosterLength = this.roster.length;
      console.log(this.roster);
    })
  }

  toggleItemHave(itemEntry: object): void{
    for(var i = 0; i < this.itemEntriesLeng; i++){
      if(this.itemEntries[i].charName == itemEntry.charName && this.itemEntries[i].itemName == itemEntry.itemName){
        if(itemEntry.hasItem){
          this.itemEntries[i].hasItem = false;
          
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).classList.add("doesNotHaveItem");
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).classList.remove("haveItem");
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).innerText = "Does Not Have Item";
          
        }else{
          
          this.itemEntries[i].hasItem = true;
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).classList.add("hasItem");
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).classList.remove("doesNotHaveItem");
          document.getElementById(itemEntry.charName+itemEntry.itemName+itemEntry.prioValue).innerText = "Has Item";
          
        }
      }
    }
  }

  updateLootSheet(): void{
    this.lootSheetUpdate = [];
    for(var i = 0; i < this.itemEntriesLeng; i++){
      for(var j = 0; i < this.rosterLength; j++){
        if(this.itemEntries[i].charName == this.roster[j].charName){
          this.lootSheetUpdate.push({charId: this.roster[j].charId, itemName: this.itemEntries[i].itemName, prioValue: this.itemEntries[i].prioValue, hasItem: this.itemEntries[i].hasItem });
          break;
        }
      }
    }
    
    this.itemEntryService.updateAttendance(this.lootSheetUpdate).subscribe( () =>{
    })
    window.alert("The lootsheet has been successfuly updated");
  }
}