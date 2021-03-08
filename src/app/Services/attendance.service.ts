import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendance, AddAttendance, AttUpdate, NameWithAttendance } from '../Models/attendance';

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

  getAttendanceCount(): Observable<NameWithAttendance[]>{
    let url = "http://localhost:8080/api/getItemEntryAttendance"
    return this.http.get<NameWithAttendance[]>(`${url}`);
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

  addAttendanceForNewUser(newUserAttendance: AddAttendance[]): Observable<AddAttendance[]>{
    let url = "http://localhost:8080/api/addAttendanceForNewUser"
    return this.http.put<AddAttendance[]>(url, newUserAttendance);
  }
}
