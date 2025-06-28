import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {PlaneRoutingModule} from './plane-routing-module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    PlaneRoutingModule
  ],
  bootstrap: [],
})
export class PlaneModule { }
