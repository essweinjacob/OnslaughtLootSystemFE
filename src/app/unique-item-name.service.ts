import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniqueItemNameService {

  private baseUrl = "http://localhost:8080/api/uniqueItemNames";

  constructor(private http: HttpClient) { }

  getUniqueItemNames(): Observable<String[]>{
    return this.http.get<String[]>(`${this.baseUrl}`);
  }
}