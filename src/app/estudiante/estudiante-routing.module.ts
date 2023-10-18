import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudianteComponent } from './estudiante.component';
import { HistoriaClinicaEditComponent } from './historia-clinica-edit/historia-clinica-edit.component';

const routes: Routes = [
  { path: '', component: EstudianteComponent },
  { path: 'historia-clinica/edicion/:id', component: HistoriaClinicaEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudianteRoutingModule {}
