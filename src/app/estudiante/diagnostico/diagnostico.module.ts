import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiagnosticoRoutingModule } from './diagnostico-routing.module';
import { DiagnosticoComponent } from './diagnostico.component';
import { SharedModule } from 'src/app/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DiagnosticoComponent
  ],
  imports: [
    CommonModule,
    DiagnosticoRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DiagnosticoModule { }
