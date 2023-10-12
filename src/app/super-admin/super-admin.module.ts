import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminComponent } from './super-admin.component';
import { SharedModule } from '../shared.module';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { UsuarioNewComponent } from './pages/usuarios/usuario-new/usuario-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioEditComponent } from './pages/usuarios/usuario-edit/usuario-edit.component';
import { AsignaturasComponent } from './pages/asignaturas/asignaturas.component';
import { MaestrosComponent } from './pages/maestros/maestros.component';
import { PerfilComponent } from './pages/maestros/perfil/perfil.component';


@NgModule({
  declarations: [
    SuperAdminComponent,
    UsuariosComponent,
    EstadisticasComponent,
    UsuarioNewComponent,
    UsuarioEditComponent,
    AsignaturasComponent,
    MaestrosComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SuperAdminModule { }
