import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ItemEntryService } from '../item-entry.service';
import { ItemEntry } from '../itemEntry';

@Component({
  selector: 'app-item-entry',
  templateUrl: './item-entry.component.html',
  styleUrls: ['./item-entry.component.css']
})
export class ItemEntryComponent implements OnInit {
  
  itemEntries: ItemEntry[];
  itemName: string;

  constructor(private itemEntryService: ItemEntryService) { }

  ngOnInit(): void {
    this.itemEntryService.getItemEntries().subscribe((data: ItemEntry[]) => {
      console.log(data);
      this.itemEntries = data;
    });
  }

  Search() {
    if(this.itemName != ""){
      this.itemEntries = this.itemEntries.filter(res => {
        return res.itemName.toLocaleLowerCase().match(this.itemName.toLocaleLowerCase());
      });
    }else if(this.itemName == ""){
      this.ngOnInit();
    }
  }
}