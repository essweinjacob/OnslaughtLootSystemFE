import { HttpClient , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roster, UpdateNote } from './roster';

@Injectable({
  providedIn: 'root'
})
export class RosterAllEntriesService {
  private baseUrl = "http://localhost:8080/api/getAllRosterEntities"

  constructor(private http: HttpClient) { }

  getRosterEntries(): Observable<Roster[]>{
    return this.http.get<Roster[]>(`${this.baseUrl}`);
  }

  getNotesByName(charName: any): Observable<any>{
    let url = "http://localhost:8080/api/getNoteByName/" + charName;
    return this.http.get<any>(url);
  }

  updateNote(givenNote: UpdateNote): Observable<UpdateNote>{
    let url = "http://localhost:8080/api/updateNote";
    return this.http.put<UpdateNote>(url, givenNote);
  }
}
