import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudianteComponent } from './estudiante.component';
import { HistoriaClinicaEditComponent } from './historia-clinica-edit/historia-clinica-edit.component';
import { EstudianteGuard } from './estudiante.guard';
import { MisProfesoresComponent } from './mis-profesores/mis-profesores.component';
import { MisPracticasComponent } from './mis-practicas/mis-practicas.component';
import { historiaGuard } from './historia-clinica.guard';
import { AbrirHistoriaEstudianteComponent } from './abrir-historia-estudiante/abrir-historia-estudiante.component';
import { TratamientosComponent } from './tratamientos/tratamientos.component';
import { DiagnosticoComponent } from './diagnostico/diagnostico.component';
import { DiagnosticoViewComponent } from './diagnostico-view/diagnostico-view.component';

const routes: Routes = [
  { path: '', canActivate: [EstudianteGuard], component: EstudianteComponent },
  { path: 'historia-clinica/edicion/:id', canActivate: [historiaGuard], component: HistoriaClinicaEditComponent },
  { path: 'mis-materias', canActivate: [EstudianteGuard], component: MisProfesoresComponent },
  { path: 'mis-practicas', canActivate: [EstudianteGuard], component: MisPracticasComponent },
  { path: 'abrir-historia-estudiante', canActivate: [EstudianteGuard], component: AbrirHistoriaEstudianteComponent },
  { path: 'tratamientos/:historia_clinica_id/:diagnostico_id', canActivate: [EstudianteGuard], component: TratamientosComponent },
  { path: 'diagnostico/:id', canActivate: [EstudianteGuard], component: DiagnosticoComponent },
  { path: 'diagnostico-view/:id', canActivate: [EstudianteGuard], component: DiagnosticoViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudianteRoutingModule {}
