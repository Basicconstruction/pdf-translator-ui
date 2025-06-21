import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { PdfProcessing } from './pdf-processing/pdf-processing';
import { PdfViewer } from './pdf-processing/pdf-viewer/pdf-viewer';

@NgModule({
  declarations: [
    App,
    PdfProcessing,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
