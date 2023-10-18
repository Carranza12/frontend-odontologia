import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudianteRoutingModule } from './estudiante-routing.module';
import { EstudianteComponent } from './estudiante.component';
import { SharedModule } from '../shared.module';
import { HistoriaClinicaEditComponent } from './historia-clinica-edit/historia-clinica-edit.component';


@NgModule({
  declarations: [
    EstudianteComponent,
    HistoriaClinicaEditComponent
  ],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    SharedModule
  ]
})
export class EstudianteModule { }
