import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MenuAuthComponent } from './auth/menu-auth/menu-auth.component';
import { AuthGuard } from './auth/auth.guard';
import { SuperAdminGuard } from './super-admin/superAdmin.guard';
import { EmpleadoGuard } from './empleado/empleado.guard';
import { EstudianteGuard } from './estudiante/estudiante.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: '404',
    loadChildren: () =>
      import('./not-found/not-found.module').then((m) => m.NotFoundModule),
  },

  {
    path: 'superAdmin',
    canActivate: [SuperAdminGuard],
    loadChildren: () =>
      import('./super-admin/super-admin.module').then(
        (m) => m.SuperAdminModule
      ),
  },
  {
    path: 'trabajador',
    canActivate: [EmpleadoGuard],
    loadChildren: () =>
      import('./empleado/empleado.module').then((m) => m.EmpleadoModule),
  },
  {
    path: 'estudiante',
    canActivate: [EstudianteGuard],
    loadChildren: () =>
      import('./estudiante/estudiante.module').then((m) => m.EstudianteModule),
  },
  {
    path: 'maestro',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./maestro/maestro.module').then((m) => m.MaestroModule),
  },
  { path: '403', loadChildren: () => import('./not-permise/not-permise.module').then(m => m.NotPermiseModule) },
  { path: '**', redirectTo: '404', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
