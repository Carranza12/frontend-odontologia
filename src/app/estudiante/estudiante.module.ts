import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudianteRoutingModule } from './estudiante-routing.module';
import { EstudianteComponent } from './estudiante.component';
import { SharedModule } from '../shared.module';
import { HistoriaClinicaEditComponent } from './historia-clinica-edit/historia-clinica-edit.component';
import { MisProfesoresComponent } from './mis-profesores/mis-profesores.component';
import { MisPracticasComponent } from './mis-practicas/mis-practicas.component';


@NgModule({
  declarations: [
    EstudianteComponent,
    HistoriaClinicaEditComponent,
    MisProfesoresComponent,
    MisPracticasComponent
  ],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    SharedModule
  ]
})
export class EstudianteModule { }
