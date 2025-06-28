import { Component } from '@angular/core';
import {RectangleDrawerComponent} from '../../components/rectangle-drawer/rectangle-drawer';

@Component({
  selector: 'app-draw-test',
  standalone: true,
  templateUrl: './draw-test.html',
  imports: [
    RectangleDrawerComponent
  ],
  styleUrl: './draw-test.css'
})
export class DrawTest {

}
