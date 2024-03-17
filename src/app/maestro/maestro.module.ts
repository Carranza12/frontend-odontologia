import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaestroRoutingModule } from './maestro-routing.module';
import { MaestroComponent } from './maestro.component';
import { SharedModule } from '../shared.module';
import { AbrirHistoriaComponent } from './pages/abrir-historia/abrir-historia.component';
import { DashboardSaludComponent } from './pages/dashboard-salud/dashboard-salud.component';


@NgModule({
  declarations: [
    MaestroComponent,
    AbrirHistoriaComponent,
    DashboardSaludComponent
  ],
  imports: [
    CommonModule,
    MaestroRoutingModule,
    SharedModule
  ]
})
export class MaestroModule { }
