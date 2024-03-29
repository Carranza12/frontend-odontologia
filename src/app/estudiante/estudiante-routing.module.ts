import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudianteComponent } from './estudiante.component';
import { HistoriaClinicaEditComponent } from './historia-clinica-edit/historia-clinica-edit.component';
import { EstudianteGuard } from './estudiante.guard';
import { MisProfesoresComponent } from './mis-profesores/mis-profesores.component';
import { MisPracticasComponent } from './mis-practicas/mis-practicas.component';
import { historiaGuard } from './historia-clinica.guard';

const routes: Routes = [
  { path: '', canActivate: [EstudianteGuard], component: EstudianteComponent },
  { path: 'historia-clinica/edicion/:id', canActivate: [historiaGuard], component: HistoriaClinicaEditComponent },
  { path: 'mis-materias', canActivate: [EstudianteGuard], component: MisProfesoresComponent },
  { path: 'mis-practicas', canActivate: [EstudianteGuard], component: MisPracticasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudianteRoutingModule {}
