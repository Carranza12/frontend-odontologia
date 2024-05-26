import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private PATIENTS_URL_API = environment.backendHost + '/api/patients';

  private CLINICA_CREATE_URL_API =
    environment.backendHost + '/api/patients/clinica/create';

  private CLINICA_GET_URL_API =
    environment.backendHost + '/api/patients/clinicas';

  

  constructor(private http: HttpClient) {}

  public getPacientes(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.PATIENTS_URL_API}`, { headers });
    }
    return [];
  }

  public searchPatients(queries: string): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.PATIENTS_URL_API}/search${queries}`, {
        headers,
      });
    }
    return [];
  }

  public dashboardData(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.PATIENTS_URL_API}/dashboard-salud`, {
        headers,
      });
    }
    return [];
  }

  public getHistoriaClinicaByCodigo(codigo_id: string): any {
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

  createClinica(data: any): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.post(`${this.CLINICA_CREATE_URL_API}`, data, {
        headers,
      });
    }
    return false;
  }

  getClinicas(page?: string, filters?: any): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      let query = '';
      for (const filter of filters) {
        if (filter.value) {
          if (!query) {
            query += `?${filter.name}=${filter.value}`;
          } else {
            query += `&${filter.name}=${filter.value}`;
          }
        }
      }
      console.log('query:', query);
      if (page && query) {
        return this.http.get(`${this.CLINICA_GET_URL_API}${query}&page=${page}`, {
          headers,
        });
      }
      if (page && !query) {
        return this.http.get(`${this.CLINICA_GET_URL_API}?page=${page}`, { headers });
      }
      if (!page) {
        return this.http.get(`${this.CLINICA_GET_URL_API}${query}`, { headers });
      }
    }
    return false;
  }

  getClinica(id: string): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.CLINICA_GET_URL_API}/${id}`, { headers });
    }
    return false;
  }

  EditClinica(user: any, id: string): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.put(`${this.CLINICA_GET_URL_API}/${id}`, user, {
        headers,
      });
    }
    return false;
  }

  deleteClinica(id: string): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.delete(`${this.CLINICA_GET_URL_API}/${id}`, { headers });
    }
    return false;
  }

  getAllClinicas(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      console.log("url:", `${this.CLINICA_GET_URL_API}/all`)
      return this.http.get(`${this.CLINICA_GET_URL_API}/all`, { headers });
    }
  }

}
