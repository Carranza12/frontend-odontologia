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
import { NgxSignaturePadModule } from '@eve-sama/ngx-signature-pad';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { AsignaturasNewComponent } from './pages/asignaturas/asignaturas-new/asignaturas-new.component';
import { AsignaturasEditComponent } from './pages/asignaturas/asignaturas-edit/asignaturas-edit.component';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { EstudiantePerfilComponent } from './pages/estudiantes/estudiante-perfil/estudiante-perfil.component';


@NgModule({
  declarations: [
    SuperAdminComponent,
    UsuariosComponent,
    EstadisticasComponent,
    UsuarioNewComponent,
    UsuarioEditComponent,
    AsignaturasComponent,
    MaestrosComponent,
    PerfilComponent,
    ProfileCardComponent,
    AsignaturasNewComponent,
    AsignaturasEditComponent,
    EstudiantesComponent,
    EstudiantePerfilComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSignaturePadModule
  ]
})
export class SuperAdminModule { }
