import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadoRoutingModule } from './empleado-routing.module';
import { EmpleadoComponent } from './empleado.component';
import { SharedModule } from '../shared.module';


@NgModule({
  declarations: [
    EmpleadoComponent
  ],
  imports: [
    CommonModule,
    EmpleadoRoutingModule,
    SharedModule
  ]
})
export class EmpleadoModule { }
