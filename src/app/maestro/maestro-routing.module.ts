import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaestroComponent } from './maestro.component';
import { PerfilMaestroComponent } from './pages/perfil-maestro/perfil-maestro.component';

const routes: Routes = [
  { path: '', component: MaestroComponent },
  { path: 'perfil-maestro', component: PerfilMaestroComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaestroRoutingModule {}
