import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private USERS_URL_API = 'http://localhost:3000/api/auth/users';
  private USER_URL_API = 'http://localhost:3000/api/auth/user';
  private REGSITER_USER_URL_API = 'http://localhost:3000/api/auth/register';
  private EDIT_USER_URL_API = 'http://localhost:3000/api/auth/users';
  private DELETE_USER_URL_API = 'http://localhost:3000/api/auth/users';
  private CRETAE_PATIENT_HISTORIA_URL_API =
    'http://localhost:3000/api/patients';
  private GET_HISTORIA_AND_PATIENT_URL_API =
    'http://localhost:3000/api/patients/historia_clinica';


    private USER_URLE_MAIL_API = 'http://localhost:3000/api/auth/user/email';
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

  EditUser(user: any, id: string): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.put(`${this.EDIT_USER_URL_API}/${id}`, user, {
        headers,
      });
    }
    return false;
  }

  getUser(id: string): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.USER_URL_API}/${id}`, { headers });
    }
    return false;
  }

  getUserByEmail(email: any): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      const respuesta = this.http.get(`${this.USER_URLE_MAIL_API}/${email}`, { headers });
      return respuesta
    }
    return false;
  }

  getHistoriaClinica(id: string) :any{
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.GET_HISTORIA_AND_PATIENT_URL_API}/${id}`, {
        headers,
      });
    }
    return false;
  }

  getSemestreList(){
    return [
      {
        value: '1',
        text: 'primer semestre',
      },
      {
        value: '2',
        text: 'segundo semestre',
      },
      {
        value: '3',
        text: 'tercer semestre',
      },
      {
        value: '4',
        text: 'cuarto semestre',
      },
      {
        value: '5',
        text: 'quinto semestre',
      },
      {
        value: '6',
        text: 'sexto semestre',
      },
      {
        value: '7',
        text: 'septimo semestre',
      },
      {
        value: '8',
        text: 'octavo semestre',
      },
      {
        value: '9',
        text: 'noveno semestre',
      },
    ];
  }

  getCarrerasList(){
    return [
      {
        value: 'Lic en odontologia',
        text: 'Lic en odontologia',
      },
      {
        value: 'Cirujano Dentista',
        text: 'Cirujano Dentista',
      },
    ];
  }

  deleteUser(id: string): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.delete(`${this.DELETE_USER_URL_API}/${id}`, { headers });
    }
    return false;
  }

  createPacienteAndHistoriaClinica(user: any): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.post(`${this.CRETAE_PATIENT_HISTORIA_URL_API}`, user, {
        headers,
      });
    }
    return false;
  }
}
