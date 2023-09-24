import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoriaClinicaRoutingModule } from './historia-clinica-routing.module';
import { HistoriaClinicaComponent } from './historia-clinica.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { AppModule } from '../app.module';


@NgModule({
  declarations: [
    HistoriaClinicaComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    HistoriaClinicaRoutingModule,
  ],
  exports: [
    SidebarComponent
  ]
})
export class HistoriaClinicaModule { }
