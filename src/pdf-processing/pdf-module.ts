import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PdfRoutingModule} from './pdf-routing-module';
import {PdfProcessing} from './pdf-processing';
import {RouterOutlet} from '@angular/router';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PdfRoutingModule,
    RouterOutlet
  ],
  bootstrap: [PdfProcessing],
})
export class PdfModule { }
