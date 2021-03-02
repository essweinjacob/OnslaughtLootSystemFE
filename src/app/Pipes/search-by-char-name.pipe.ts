import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByCharName'
})
export class SearchByCharNamePipe implements PipeTransform {

  transform(searchItem: any[], searchText: any): any[] {
    if(!searchItem){
      return [];
    }
    if(!searchText) {
      return searchItem;
    }
    searchText = searchText.toLowerCase();
    return searchItem.filter(it => {
      return it.charName.toLowerCase().includes(searchText);
    })
  }

}
