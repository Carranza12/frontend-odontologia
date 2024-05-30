import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared.module';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedModule, WebcamModule],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
