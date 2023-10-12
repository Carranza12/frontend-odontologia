import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './empleado.component';
import { EmpleadoGuard } from './empleado.guard';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ConsultaNewComponent } from './pages/consulta-new/consulta-new.component';
import { PacienteNewComponent } from './pages/paciente-new/paciente-new.component';

const routes: Routes = [
  { path: '', canActivate: [EmpleadoGuard], component: EmpleadoComponent },
  { path: 'consultas', canActivate: [EmpleadoGuard], component: ConsultaComponent },
  { path: 'consultas/nuevo', canActivate: [EmpleadoGuard], component: ConsultaNewComponent },
  { path: 'pacientes/nuevo', canActivate: [EmpleadoGuard], component: PacienteNewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadoRoutingModule {}
