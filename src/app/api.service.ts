import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private USERS_URL_API = 'http://localhost:3000/api/auth/users';
  private REGSITER_USER_URL_API = 'http://localhost:3000/api/auth/register';

  constructor(private http: HttpClient) {}

  getUsers(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.USERS_URL_API}`, { headers });
    }
    return false;
  }

  registerUser(user: any): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.post(`${this.REGSITER_USER_URL_API}`, user, { headers });
    }
    return false;
  }
}
