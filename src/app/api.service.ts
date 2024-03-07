import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment'
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private USERS_URL_API = environment.backendHost+'/api/auth/users';
  private USER_URL_API = environment.backendHost+'/api/auth/user';
  private REGSITER_USER_URL_API = environment.backendHost+'/api/auth/register';
  private EDIT_USER_URL_API = environment.backendHost+'/api/auth/users';
  private DELETE_USER_URL_API = environment.backendHost+'/api/auth/users';
  private CRETAE_PATIENT_HISTORIA_URL_API =
    environment.backendHost+'/api/patients';
  private GET_HISTORIA_AND_PATIENT_URL_API =
    environment.backendHost+'/api/patients/historia_clinica';

    private PERFIL_MAESTROS_URL = environment.backendHost+'/api/perfil/maestros';


    private USER_URLE_MAIL_API = environment.backendHost+'/api/auth/user/email';
  constructor(private http: HttpClient) {}

  getUsers(page?:string): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      if(page){
        return this.http.get(`${this.USERS_URL_API}?page=${page}`, { headers });
      }
      if(!page){
        return this.http.get(`${this.USERS_URL_API}`, { headers });
      }
    }
    return false;
  }

  getMaestros(page?:string): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      if(page){
        return this.http.get(`${this.USERS_URL_API}/maestros?page=${page}`, { headers });
      }
      if(!page){
        return this.http.get(`${this.USERS_URL_API}/maestros`, { headers });
      }
    }
    return false;
  }
  getMaestroPerfil(id:string): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.PERFIL_MAESTROS_URL}/${id}`, { headers });
    }
    return false;
  }
  
  getEstudiantes(page?:string): any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      if(page){
        return this.http.get(`${this.USERS_URL_API}/estudiantes?page=${page}`, { headers });
      }
      if(!page){
        return this.http.get(`${this.USERS_URL_API}/estudiantes`, { headers });
      }
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

  getDiagnostico(id: string) :any{
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.CRETAE_PATIENT_HISTORIA_URL_API}/diagnostico/${id}`, {
        headers,
      });
    }
    return false;
  }

  getTratamiento(id: string) :any{
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.CRETAE_PATIENT_HISTORIA_URL_API}/tratamientos/${id}`, {
        headers,
      });
    }
    return false;
  }

  getDiagnosticosByHistoriaClinicaID(id: string) :any{
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.CRETAE_PATIENT_HISTORIA_URL_API}/diagnostico-historia-clinica/${id}`, {
        headers,
      });
    }
    return false;
  }

  getTratamientosByHistoriaClinicaID(id: string) :any{
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.CRETAE_PATIENT_HISTORIA_URL_API}/tratamientos-historia-clinica/${id}`, {
        headers,
      });
    }
    return false;
  }

  getHistoriaClinicaByMateria(materia_id: string) :any{
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.GET_HISTORIA_AND_PATIENT_URL_API}/materia/${materia_id}`, {
        headers,
      });
    }
    return false;
  }

  getTratamientosByAlumno(alumno_id: string) :any{
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.CRETAE_PATIENT_HISTORIA_URL_API}/tratamientos/alumno/${alumno_id}`, {
        headers,
      });
    }
    return false;
  }

  getHistoriaClinicaByEstudiante(id_estudiante: string) :any{
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.http.get(`${this.GET_HISTORIA_AND_PATIENT_URL_API}/estudiante/${id_estudiante}`, {
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

  updateHistoriaClinica(id:any, body:any):any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      console.log("BODY PARA EL BACKEND:", body)
      return this.http.put(`${this.CRETAE_PATIENT_HISTORIA_URL_API}/${id}`, body, {
        headers,
      });
    }
    return false;
  }

  updateTratamiento(id:any, body:any):any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      console.log("BODY PARA EL BACKEND:", body)
      return this.http.put(`${this.CRETAE_PATIENT_HISTORIA_URL_API}/tratamientos/update/${id}`, body, {
        headers,
      });
    }
    return false;
  }

  createDiagnostico(body:any):any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      console.log("BODY PARA EL BACKEND:", body)
      return this.http.post(`${this.CRETAE_PATIENT_HISTORIA_URL_API}/diagnostico`, body, {
        headers,
      });
    }
    return false;
  }

  createTratamiento(body:any):any {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      console.log("BODY PARA EL BACKEND:", body)
      return this.http.post(`${this.CRETAE_PATIENT_HISTORIA_URL_API}/tratamientos`, body, {
        headers,
      });
    }
    return false;
  }
}

