import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminComponent } from './super-admin.component';
import { SharedModule } from '../shared.module';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';


@NgModule({
  declarations: [
    SuperAdminComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    SharedModule
  ]
})
export class SuperAdminModule { }
