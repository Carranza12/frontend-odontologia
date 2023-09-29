import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PageTitleComponent } from './components/page-title/page-title.component';

@NgModule({
  declarations: [SidebarComponent, PageTitleComponent],
  imports: [CommonModule],
  exports: [SidebarComponent, PageTitleComponent],
})
export class SharedModule {}
