import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class PerfilMaestroService {
  private GET_PATIENT_URL_API = environment.backendHost+'/api/perfil/maestros';
  private POST_PERFIL_URL_API = environment.backendHost+'/api/perfil/maestros';
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

  public post_perfil(perfil: any) {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      console.log("PERIFL BODY:", perfil)
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
