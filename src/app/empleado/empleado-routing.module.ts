import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './empleado.component';
import { EmpleadoGuard } from './empleado.guard';

const routes: Routes = [{ path: '', canActivate: [EmpleadoGuard], component: EmpleadoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoRoutingModule { }
