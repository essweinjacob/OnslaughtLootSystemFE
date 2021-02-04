import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemEntry } from './itemEntry';

@Injectable({
  providedIn: 'root'
})
export class ItemEntryService {
  private baseUrl = "http://localhost:8080/api/itemEntries"


  constructor(private http: HttpClient) { }

  getItemEntries(): Observable<ItemEntry[]>{
    return this.http.get<ItemEntry[]>(`${this.baseUrl}`);
  }
}
