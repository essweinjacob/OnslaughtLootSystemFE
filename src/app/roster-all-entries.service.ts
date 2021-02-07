import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roster } from './roster';

@Injectable({
  providedIn: 'root'
})
export class RosterAllEntriesService {
  private baseUrl = "http://localhost:8080/api/getAllRosterEntities"

  constructor(private http: HttpClient) { }

  getRosterEntries(): Observable<Roster[]>{
    return this.http.get<Roster[]>(`${this.baseUrl}`);
  }
}
