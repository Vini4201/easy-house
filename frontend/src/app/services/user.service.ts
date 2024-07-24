import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = "http://localhost:8080/easyhouse/users";

  constructor(private httpClient: HttpClient) { }

  getUsersList(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseURL);
  }

  createUser(user: User): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, user);
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseURL}/${id}`);
  }

  updateUser(id: number, user: User, currentUserRole: string): Observable<Object> {
    const params = new HttpParams().set('currentUserRole', currentUserRole);
    console.log('role:',currentUserRole)
    return this.httpClient.put(`${this.baseURL}/${id}`, user, { params });
  }

  deleteUser(id: number, currentUserRole: UserRole): Observable<void> {
    const params = new HttpParams().set('currentUserRole', currentUserRole.toString());
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`, { params });
}

  getUsersByRole(role: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL}/role/${role}`);
  }

}
