import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PerfilEstudiantesService {
  private GET_PATIENT_URL_API = 'http://localhost:3000/api/perfil/estudiantes';
  private POST_PERFIL_URL_API = 'http://localhost:3000/api/perfil/estudiantes/';
  private GET_ASIGNATURAS_URL_API = 'http://localhost:3000/api/asignaturas/semestre';
  constructor(private http: HttpClient) {}

  public getPerfil(id: string): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.GET_PATIENT_URL_API}/${id}`, { headers });
    }
    return [];
  }

  public getPerfilByEmail(id: string): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.GET_PATIENT_URL_API}/email/${id}`, { headers });
    }
    return [];
  }

  public getAsigntaturasBySemestre(carrera:any, semestre: any): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.GET_ASIGNATURAS_URL_API}/${semestre}/${carrera}`, { headers });
    }
    return [];
  }

  public post_perfil(perfil: any) {

    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.post(`${this.POST_PERFIL_URL_API}`, perfil, { headers });
    } else {
      // Devolver un observable con valor false
      return of(false);
    }
  }

  public getAll(){
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.GET_PATIENT_URL_API}`, { headers });
    } else {
      return of(false);
    }
  }
}
