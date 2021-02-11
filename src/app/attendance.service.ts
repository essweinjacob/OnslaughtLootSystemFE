import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendance, AddAttendance, AttUpdate } from './attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private getAttendanceUrl = "http://localhost:8080/api/getAttendance";
  private postUrl = "http://localhost:8080/api/postUpdateAttendance"

  constructor(private http: HttpClient) { }

  getAttendance(): Observable<Attendance[]>{
    return this.http.get<Attendance[]>(`${this.getAttendanceUrl}`);
  }

  updateAttendance(updateAttendance: AttUpdate): Observable<Attendance>{
    return this.http.put<Attendance>(`${this.postUrl}`, updateAttendance);
  }

  addAttendanceDate(addNewDate: AddAttendance[]): Observable<AddAttendance[]>{
    let addAttendanceDateUrl = "http://localhost:8080/api/putAddRaidDate"
    return this.http.put<AddAttendance[]>(`${addAttendanceDateUrl}`, addNewDate);
  }

  removeAttendanceDate(removeDate: string): Observable<string>{
    let url = "http://localhost:8080/api/removeRaidDate"
    return this.http.put<string>(`${url}`, removeDate);
  }
}
