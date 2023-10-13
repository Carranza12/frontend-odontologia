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

const routes: Routes = [
  { path: '',  canActivate: [SuperAdminGuard],component: SuperAdminComponent },
  { path: 'usuarios', canActivate: [SuperAdminGuard], component: UsuariosComponent },
  { path: 'usuarios/nuevo', canActivate: [SuperAdminGuard], component: UsuarioNewComponent },
  { path: 'usuarios/edicion/:id', canActivate: [SuperAdminGuard], component: UsuarioEditComponent },
  { path: 'estadisticas', canActivate: [SuperAdminGuard], component: EstadisticasComponent },
  { path: 'asignaturas', canActivate: [SuperAdminGuard], component: AsignaturasComponent },
  { path: 'maestros', canActivate: [SuperAdminGuard], component: MaestrosComponent },
  { path: 'maestros/perfil-maestro/:id', canActivate: [SuperAdminGuard], component: PerfilComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperAdminRoutingModule {}
