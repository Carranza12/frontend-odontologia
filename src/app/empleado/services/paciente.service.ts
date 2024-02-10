import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private PATIENTS_URL_API = environment.backendHost+'/api/patients';

  constructor(private http: HttpClient) { }

  public getPacientes():any{
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.PATIENTS_URL_API}`, { headers });
    }
    return [];
  }
}
