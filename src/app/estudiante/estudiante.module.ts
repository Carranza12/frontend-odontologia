import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudianteRoutingModule } from './estudiante-routing.module';
import { EstudianteComponent } from './estudiante.component';
import { SharedModule } from '../shared.module';
import { HistoriaClinicaEditComponent } from './historia-clinica-edit/historia-clinica-edit.component';
import { MisProfesoresComponent } from './mis-profesores/mis-profesores.component';
import { MisPracticasComponent } from './mis-practicas/mis-practicas.component';

import { NgxSignaturePadModule } from '@eve-sama/ngx-signature-pad';
import { AbrirHistoriaEstudianteComponent } from './abrir-historia-estudiante/abrir-historia-estudiante.component';
import { TratamientosComponent } from './tratamientos/tratamientos.component';
import { DiagnosticoComponent } from './diagnostico/diagnostico.component';


@NgModule({
  declarations: [
    EstudianteComponent,
    HistoriaClinicaEditComponent,
    MisProfesoresComponent,
    MisPracticasComponent,
    AbrirHistoriaEstudianteComponent,
    TratamientosComponent,
    DiagnosticoComponent
  ],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    SharedModule,
    NgxSignaturePadModule
  ]
})
export class EstudianteModule { }
