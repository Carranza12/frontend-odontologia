import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadoRoutingModule } from './empleado-routing.module';
import { EmpleadoComponent } from './empleado.component';
import { SharedModule } from '../shared.module';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ConsultaNewComponent } from './pages/consulta-new/consulta-new.component';


@NgModule({
  declarations: [
    EmpleadoComponent,
    ConsultaComponent,
    ConsultaNewComponent
  ],
  imports: [
    CommonModule,
    EmpleadoRoutingModule,
    SharedModule
  ]
})
export class EmpleadoModule { }
