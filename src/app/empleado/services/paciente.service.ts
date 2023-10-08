import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor() { }

  public getEmpleados(){
    return [
      {
        _id: "2830482349023",
        nombre: "Eduardo",
        apellido: "Aguilar",
        fehca_nacimiento: "16/09/2001",
        genero: "Masculino",
        estado_civil: "Comprometido",
        ocupacion: "Desarrollador de software",
        domicilio: "San nicolas de las garzas 456",
        telefono: "8715741717",
        ciudad_origen: "Monterrey",
        estado_origen: "Nuevo leon",
        pais_origen: "Mexico",
        ciudad_Actual: "torreon",
        historia_clinica_id: "2323",
        nombre_contacto_emergencia: "Francisco Carranza",
        parentesco_contacto_emergencia: "Primo",
        telefono_contacto_emergencia: "47827492"
      }
    ]
  }
}
