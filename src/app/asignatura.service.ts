import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class asignaturaService {
  private ASIGNATURAS_URL_API = 'http://localhost:3000/api/asignaturas';
  private ASIGNATURA_URL_API = 'http://localhost:3000/api/asignaturas';
  private CREATE_ASIGNATURA_URL_API = 'http://localhost:3000/api/asignaturas';
  private EDIT_ASIGNATURA_URL_API = 'http://localhost:3000/api/asignaturas';
  private DELETE_ASIGNATURA_URL_API = 'http://localhost:3000/api/asignaturas';

  constructor(private http: HttpClient) {}

  getAll(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.ASIGNATURAS_URL_API}`, { headers });
    }
    return false;
  }

  create(body: any): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.post(this.CREATE_ASIGNATURA_URL_API, body, {
        headers
      });
    }
    return false;
}

  edit(asignatura: any, id: string): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.put(`${this.EDIT_ASIGNATURA_URL_API}/${id}`, asignatura, {
        headers,
      });
    }
    return false;
  }

  get(id: string): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.ASIGNATURA_URL_API}/${id}`, { headers });
    }
    return false;
  }

  delete(id: string): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.delete(`${this.DELETE_ASIGNATURA_URL_API}/${id}`, { headers });
    }
    return false;
  }
}
