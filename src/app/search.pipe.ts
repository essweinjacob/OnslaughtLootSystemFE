import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByItemNamePipe'
})
export class SearchByItemNamePipe implements PipeTransform {

  transform(searchItem: any[], searchText: string): any[] {
    //console.log(searchItem);
    if(!searchItem){
      return [];
    }
    if(!searchText) {
      return searchItem;
    }
    searchText = searchText.toLowerCase();
    return searchItem.filter(it => {
      return it.itemName.toLowerCase().includes(searchText);
    })
  }
}
