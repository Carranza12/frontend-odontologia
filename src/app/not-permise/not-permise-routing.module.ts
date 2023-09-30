import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotPermiseComponent } from './not-permise.component';

const routes: Routes = [{ path: '', component: NotPermiseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotPermiseRoutingModule { }
