import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ItemEntryService } from '../item-entry.service';
import { ItemEntry } from '../itemEntry';
import { UniqueItemNameService } from '../unique-item-name.service';

@Component({
  selector: 'app-item-entry',
  templateUrl: './item-entry.component.html',
  styleUrls: ['./item-entry.component.css']
})
export class ItemEntryComponent implements OnInit {
  
  itemEntries: ItemEntry[];
  itemName: string;
  itemNameList: String[];

  constructor(private itemEntryService: ItemEntryService, private uniqueItemNameService: UniqueItemNameService) { }

  ngOnInit(): void {
    this.itemEntryService.getItemEntries().subscribe((data: ItemEntry[]) => {
      console.log(data);
      this.itemEntries = data;
    });

    this.uniqueItemNameService.getUniqueItemNames().subscribe((data: String[]) => {
      console.log(data);
      this.itemNameList = data;
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