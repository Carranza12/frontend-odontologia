import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment'
@Injectable({
  providedIn: 'root',
})
export class asignaturaService {
  private ASIGNATURAS_URL_API = environment.backendHost+'/api/asignaturas';
  private ASIGNATURA_URL_API = environment.backendHost+'/api/asignaturas';
  private CREATE_ASIGNATURA_URL_API = environment.backendHost+'/api/asignaturas';
  private EDIT_ASIGNATURA_URL_API = environment.backendHost+'/api/asignaturas';
  private DELETE_ASIGNATURA_URL_API = environment.backendHost+'/api/asignaturas';

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

  getByMaestro(maestro_id: string): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      console.log("RUTA:", `${this.ASIGNATURAS_URL_API}/maestro/${maestro_id}`)
      const data = this.http.get(`${this.ASIGNATURAS_URL_API}/maestro/${maestro_id}`, { headers })
      return data
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
