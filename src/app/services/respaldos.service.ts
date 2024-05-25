import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class RespaldosService {
  private RESPALDOS_URL_API =
    environment.backendHost + '/api/patients/respaldo';

  private IMPORT_URL_API =
    environment.backendHost + '/api/patients/importar';

  constructor(private http: HttpClient) {}

  downloadRespaldoInJSON(nameForm: string): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.get(`${this.RESPALDOS_URL_API}/${nameForm}`, {
        headers,
      });
    }
    return false;
  }

  importDataInDBFromJSON(data: any, collection: string): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.post(`${this.IMPORT_URL_API}/${collection}`,data, {
        headers,
      });
    }
    return false;
  }
}
