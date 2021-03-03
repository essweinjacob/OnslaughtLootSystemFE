import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUser } from 'app/Models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

  constructor(private http: HttpClient) { }

  addNewUser(newUser: NewUser): Observable<NewUser>{
    let url = "http://localhost:8080/api/addNewUser";
    return this.http.put<NewUser>(url, newUser);
  }
}
