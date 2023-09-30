import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotPermiseRoutingModule } from './not-permise-routing.module';
import { NotPermiseComponent } from './not-permise.component';


@NgModule({
  declarations: [
    NotPermiseComponent
  ],
  imports: [
    CommonModule,
    NotPermiseRoutingModule
  ]
})
export class NotPermiseModule { }
