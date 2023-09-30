import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminComponent } from './super-admin.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '',  canActivate: [AuthGuard],component: SuperAdminComponent },
  { path: 'usuarios', canActivate: [AuthGuard], component: UsuariosComponent },
  { path: 'estadisticas', canActivate: [AuthGuard], component: EstadisticasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperAdminRoutingModule {}
