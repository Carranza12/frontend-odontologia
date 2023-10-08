import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaestroRoutingModule } from './maestro-routing.module';
import { MaestroComponent } from './maestro.component';
import { SharedModule } from '../shared.module';
import { PerfilMaestroComponent } from './pages/perfil-maestro/perfil-maestro.component';


@NgModule({
  declarations: [
    MaestroComponent,
    PerfilMaestroComponent
  ],
  imports: [
    CommonModule,
    MaestroRoutingModule,
    SharedModule
  ]
})
export class MaestroModule { }
