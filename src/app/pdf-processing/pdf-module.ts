import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PdfRoutingModule} from './pdf-routing-module';
import {PdfProcessing} from './pdf-processing';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PdfRoutingModule,
  ],
  bootstrap: [PdfProcessing],
})
export class PdfModule { }
