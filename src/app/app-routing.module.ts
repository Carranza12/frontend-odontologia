import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MenuAuthComponent } from './auth/menu-auth/menu-auth.component';

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
  
  { path: 'superAdmin', loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminModule) },
  { path: 'empleado', loadChildren: () => import('./empleado/empleado.module').then(m => m.EmpleadoModule) },
  { path: 'estudiante', loadChildren: () => import('./estudiante/estudiante.module').then(m => m.EstudianteModule) },
  { path: 'maestro', loadChildren: () => import('./maestro/maestro.module').then(m => m.MaestroModule) },
  { path: '**', redirectTo: '404', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
