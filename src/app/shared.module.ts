import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [SidebarComponent, PageTitleComponent],
  imports: [CommonModule,ReactiveFormsModule,FormsModule, QRCodeModule],
  exports: [SidebarComponent, PageTitleComponent,ReactiveFormsModule,FormsModule,QRCodeModule],
})
export class SharedModule {}
