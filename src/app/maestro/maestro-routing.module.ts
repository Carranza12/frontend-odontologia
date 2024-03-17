import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaestroComponent } from './maestro.component';
import { AbrirHistoriaComponent } from './pages/abrir-historia/abrir-historia.component';
import { DashboardSaludComponent } from './pages/dashboard-salud/dashboard-salud.component';
import { maestroGuard } from '../estudiante/maestro.guard';

const routes: Routes = [
  { path: '', canActivate: [maestroGuard], component: MaestroComponent },
  { path: 'abrir-historia', canActivate: [maestroGuard],component: AbrirHistoriaComponent },
  { path: 'dashboard-salud', canActivate: [maestroGuard], component: DashboardSaludComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaestroRoutingModule {}
