import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { AlertComponent } from './components/alert/alert.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { EvidenciaModalComponent } from './components/evidencia-modal/evidencia-modal.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
@NgModule({
  declarations: [
    SidebarComponent,
    PageTitleComponent,
    AlertComponent,
    PaginatorComponent,
    EvidenciaModalComponent,
    LoadingSpinnerComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, QRCodeModule],
  exports: [
    SidebarComponent,
    PageTitleComponent,
    ReactiveFormsModule,
    FormsModule,
    QRCodeModule,
    AlertComponent,
    PaginatorComponent,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule {}
