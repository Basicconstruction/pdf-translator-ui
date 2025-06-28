import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import {PdfViewer} from '../pdf-processing/pdf-viewer/pdf-viewer';
import {PdfProcessing} from '../pdf-processing/pdf-processing';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    App,
    PdfProcessing,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PdfViewer,
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    BrowserAnimationsModule,  // 导入
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
