import {NgModule} from '@angular/core';
import {DrawRoutingModule} from './draw-routing-module';
import { Draw } from './draw';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';

@NgModule({
  declarations: [
    Draw
  ],
  imports: [
    DrawRoutingModule,
    CommonModule,
    RouterOutlet
  ],
  providers: [
  ],
  bootstrap: [Draw]
})
export class DrawModule {

}
