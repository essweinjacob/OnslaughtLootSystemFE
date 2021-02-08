import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendance } from './attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private getUrl = "http://localhost:8080/api/getAttendance";
  private postUrl = "http://localhost:8080/api/postUpdateAttendance"

  constructor(private http: HttpClient) { }

  getAttendance(): Observable<Attendance[]>{
    return this.http.get<Attendance[]>(`${this.getUrl}`);
  }

  updateAttendance(updateAttendance: Attendance[]): Observable<Attendance[]>{
    return this.http.put<Attendance[]>(`${this.postUrl}`, updateAttendance);
  }
}
