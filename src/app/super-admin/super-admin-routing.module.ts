import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminComponent } from './super-admin.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { AuthGuard } from '../auth/auth.guard';
import { UsuarioNewComponent } from './pages/usuarios/usuario-new/usuario-new.component';
import { SuperAdminGuard } from './superAdmin.guard';
import { UsuarioEditComponent } from './pages/usuarios/usuario-edit/usuario-edit.component';
import { AsignaturasComponent } from './pages/asignaturas/asignaturas.component';
import { MaestrosComponent } from './pages/maestros/maestros.component';
import { PerfilComponent } from './pages/maestros/perfil/perfil.component';
import { AsignaturasNewComponent } from './pages/asignaturas/asignaturas-new/asignaturas-new.component';
import { AsignaturasEditComponent } from './pages/asignaturas/asignaturas-edit/asignaturas-edit.component';
import { EstudianteComponent } from '../estudiante/estudiante.component';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { EstudiantePerfilComponent } from './pages/estudiantes/estudiante-perfil/estudiante-perfil.component';

const routes: Routes = [
  { path: '',  canActivate: [SuperAdminGuard],component: SuperAdminComponent },
  { path: 'usuarios', canActivate: [SuperAdminGuard], component: UsuariosComponent },
  { path: 'usuarios/nuevo', canActivate: [SuperAdminGuard], component: UsuarioNewComponent },
  { path: 'usuarios/edicion/:id', canActivate: [SuperAdminGuard], component: UsuarioEditComponent },
  { path: 'estadisticas', canActivate: [SuperAdminGuard], component: EstadisticasComponent },
  { path: 'asignaturas', canActivate: [SuperAdminGuard], component: AsignaturasComponent },
  { path: 'asignaturas/nuevo', canActivate: [SuperAdminGuard], component: AsignaturasNewComponent },
  { path: 'asignaturas/edicion/:id', canActivate: [SuperAdminGuard], component: AsignaturasEditComponent },
  { path: 'maestros', canActivate: [SuperAdminGuard], component: MaestrosComponent },
  { path: 'maestros/perfil-maestro/:id', canActivate: [SuperAdminGuard], component: PerfilComponent },
  { path: 'estudiantes', canActivate: [SuperAdminGuard], component: EstudiantesComponent },
  { path: 'estudiantes/perfil-estudiante/:id', canActivate: [SuperAdminGuard], component: EstudiantePerfilComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperAdminRoutingModule {}
