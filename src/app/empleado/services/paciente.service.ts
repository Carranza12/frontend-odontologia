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

  public searchPatients(queries:string):any{
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.PATIENTS_URL_API}/search${queries}`, { headers });
    }
    return [];
  }

  public dashboardData():any{
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.PATIENTS_URL_API}/dashboard-salud`, { headers });
    }
    return [];
  }
 

  public getHistoriaClinicaByCodigo(codigo_id: string) :any{
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.PATIENTS_URL_API}/codigo/${codigo_id}`, {
        headers,
      });
    }
    return false;
  }
}
