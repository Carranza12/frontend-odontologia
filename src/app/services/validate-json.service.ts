import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ValidateJsonService {
  constructor() {}

  validateCamposInUsers(users: any[]): boolean {
    const requiredAttributes = [
      '_id',
      'email',
      'password',
      'name',
      'last_name',
      'roles',
      'profileImage',
      'role_default',
    ];

    for (const user of users) {
      for (const attribute of requiredAttributes) {
        if (!user.hasOwnProperty(attribute)) {
          Swal.fire({
            icon: 'warning',
            title: 'Algo ha salido mal',
            text: `La estructura del JSON no corresponde a la colección de usuarios de nuestra base de datos, vuelva a intentarlo con el JSON correcto.`,
          });
          return false;
        }
      }
    }
    return true;
  }

  validateCamposInTratamientos(tratamientos: any[]): boolean {
    const requiredAttributes = [
      '_id',
      'historia_clinica_id',
      'diagnostico_id',
      'alumno_id',
    ];

    for (const tratamiento of tratamientos) {
      for (const attribute of requiredAttributes) {
        if (!tratamiento.hasOwnProperty(attribute)) {
          Swal.fire({
            icon: 'warning',
            title: 'Algo ha salido mal',
            text: `La estructura del JSON no corresponde a la colección de tratamientos de nuestra base de datos, vuelva a intentarlo con el JSON correcto.`,
          });
          return false;
        }
      }
    }
    return true;
  }

  validateCamposInDiagnosticos(diagnosticos: any[]): boolean {
    const requiredAttributes = [
      '_id',
      'historia_clinica_id',
      'alumno_id',
      'tratamiento_id',
    ];

    for (const diagnostico of diagnosticos) {
      for (const attribute of requiredAttributes) {
        if (!diagnostico.hasOwnProperty(attribute)) {
          Swal.fire({
            icon: 'warning',
            title: 'Algo ha salido mal',
            text: `La estructura del JSON no corresponde a la colección de diagnósticos de nuestra base de datos, vuelva a intentarlo con el JSON correcto.`,
          });
          return false;
        }
      }
    }
    return true;
  }

  validateCamposInPatients(patients: any[]): boolean {
    const requiredAttributes = ['_id', 'nombre_completo'];

    for (const patient of patients) {
      for (const attribute of requiredAttributes) {
        if (!patient.hasOwnProperty(attribute)) {
          Swal.fire({
            icon: 'warning',
            title: 'Algo ha salido mal',
            text: `La estructura del JSON no corresponde a la colección de pacientes de nuestra base de datos, vuelva a intentarlo con el JSON correcto.`,
          });
          return false;
        }
      }
    }
    return true;
  }

  validateCamposInHistoriasClinicas(historiasClinicas: any[]): boolean {
    const requiredAttributes = ['Fecha', 'id_paciente', 'codigo'];

    for (const historiaClinica of historiasClinicas) {
      for (const attribute of requiredAttributes) {
        if (!historiaClinica.hasOwnProperty(attribute)) {
          Swal.fire({
            icon: 'warning',
            title: 'Algo ha salido mal',
            text: `La estructura del JSON no corresponde a la colección de historias clínicas de nuestra base de datos, vuelva a intentarlo con el JSON correcto.`,
          });
          return false;
        }
      }
    }
    return true;
  }

  validateCamposPerfilEstudiantes(estudiantes: any[]): boolean {
    const requiredAttributes = [
      '_id',
      'id_user',
      'semestre_actual',
      'Matricula',
      'carrera',
      'materias',
    ];

    for (const estudiante of estudiantes) {
      for (const attribute of requiredAttributes) {
        if (!estudiante.hasOwnProperty(attribute)) {
          Swal.fire({
            icon: 'warning',
            title: 'Algo ha salido mal',
            text: `La estructura del JSON no corresponde a la colección de perfil de estudiantes de nuestra base de datos, vuelva a intentarlo con el JSON correcto.`,
          });
          return false;
        }
      }
    }
    return true;
  }

  validateCamposPerfilMaestros(maestros: any[]): boolean {
    const requiredAttributes = [
      '_id',
      'id_user',
      'expediente',
      'cedula_profesional',
      'universidad',
      'especialidad',
      'firma',
    ];

    for (const maestro of maestros) {
      for (const attribute of requiredAttributes) {
        if (!maestro.hasOwnProperty(attribute)) {
          Swal.fire({
            icon: 'warning',
            title: 'Algo ha salido mal',
            text: `La estructura del JSON no corresponde a la colección de perfil de maestros de nuestra base de datos, vuelva a intentarlo con el JSON correcto.`,
          });
          return false;
        }
      }
    }
    return true;
  }

  validateCamposClinicas(clinicas: any[]): boolean {
    const requiredAttributes = [
      '_id',
      'name',
      'level',
      'telefono',
    ];

    for (const clinica of clinicas) {
      for (const attribute of requiredAttributes) {
        if (!clinica.hasOwnProperty(attribute)) {
          Swal.fire({
            icon: 'warning',
            title: 'Algo ha salido mal',
            text: `La estructura del JSON no corresponde a la colección clinicas de nuestra base de datos, vuelva a intentarlo con el JSON correcto.`,
          });
          return false;
        }
      }
    }
    return true;
  }
}
