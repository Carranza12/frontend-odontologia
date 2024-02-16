import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudianteRoutingModule } from './estudiante-routing.module';
import { EstudianteComponent } from './estudiante.component';
import { SharedModule } from '../shared.module';
import { HistoriaClinicaEditComponent } from './historia-clinica-edit/historia-clinica-edit.component';
import { MisProfesoresComponent } from './mis-profesores/mis-profesores.component';
import { MisPracticasComponent } from './mis-practicas/mis-practicas.component';
import { AbrirHistoriaEstudianteComponent } from './abrir-historia-estudiante/abrir-historia-estudiante.component';
import { TratamientosComponent } from './tratamientos/tratamientos.component';


@NgModule({
  declarations: [
    EstudianteComponent,
    HistoriaClinicaEditComponent,
    MisProfesoresComponent,
    MisPracticasComponent,
    AbrirHistoriaEstudianteComponent,
    TratamientosComponent
  ],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    SharedModule
  ]
})
export class EstudianteModule { }
