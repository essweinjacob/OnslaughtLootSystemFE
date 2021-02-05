import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByCharNamePipe'
})
export class SearchByCharNamePipe implements PipeTransform {

  transform(searchItem: any[], searchText: string): any[] {
    console.log(searchItem);
    if(!searchItem){
      return [];
    }
    if(!searchText) {
      return searchItem;
    }
    searchText = searchText.toLowerCase();
    return searchItem.filter(it => {
      console.log(it.charName);
      return it.charName.toLowerCase().includes(searchText);
    })
  }

}
