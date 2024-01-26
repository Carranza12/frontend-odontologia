import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaestroComponent } from './maestro.component';
import { PerfilMaestroComponent } from './pages/perfil-maestro/perfil-maestro.component';
import { materiasProfeComponent } from './pages/materias-profe/materias-profe.component';
import { practicasPendientesComponent } from './pages/practicas-pendientes/practicas-pendientes.component';

const routes: Routes = [
  { path: '', component: MaestroComponent },
  { path: 'perfil-maestro', component: PerfilMaestroComponent },
  { path: 'mis-materias', component: materiasProfeComponent },
  { path: 'mis-materias/practicas-pendientes/:materia_id', component: practicasPendientesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaestroRoutingModule {}
