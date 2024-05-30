import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadoRoutingModule } from './empleado-routing.module';
import { EmpleadoComponent } from './empleado.component';
import { SharedModule } from '../shared.module';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ConsultaNewComponent } from './pages/consulta-new/consulta-new.component';
import { PacienteNewComponent } from './pages/paciente-new/paciente-new.component';
import { UppercaseDirective } from './pages/consulta-new/Uppercase.directive';
import { WebcamModule } from 'ngx-webcam';


@NgModule({
  declarations: [
    EmpleadoComponent,
    ConsultaComponent,
    ConsultaNewComponent,
    PacienteNewComponent,
    UppercaseDirective
  ],
  imports: [
    CommonModule,
    EmpleadoRoutingModule,
    SharedModule,
    WebcamModule
  ]
})
export class EmpleadoModule { }
