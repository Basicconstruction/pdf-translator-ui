import {NgModule, provideBrowserGlobalErrorListeners} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {DrawRoutingModule} from './draw-routing-module';
import { Draw } from './draw';

@NgModule({
  declarations: [

    Draw
  ],
  imports: [
    DrawRoutingModule
  ],
  providers: [
  ],
  bootstrap: [Draw]
})
export class DrawModule {

}
