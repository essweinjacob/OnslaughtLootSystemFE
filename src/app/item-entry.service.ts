import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemEntry, LootSheetUpdate } from './itemEntry';

@Injectable({
  providedIn: 'root'
})
export class ItemEntryService {
  private baseUrl = "http://localhost:8080/api/itemEntries"
  private postUrl = "http://localhost:8080/api/updateLootSheet"

  constructor(private http: HttpClient) { }

  getItemEntries(): Observable<ItemEntry[]>{
    return this.http.get<ItemEntry[]>(`${this.baseUrl}`);
  }

  updateItem(updateItem: LootSheetUpdate): Observable<LootSheetUpdate>{
    return this.http.put<LootSheetUpdate>(`${this.postUrl}`, updateItem);
  }
}
