import { Component } from '@angular/core';
import {RectangleDrawerTestComponent} from '../../../test-components/rectangle-drawer/rectangle-drawer';

@Component({
  selector: 'app-draw-test',
  standalone: true,
  templateUrl: './draw-test.html',
  imports: [
    RectangleDrawerTestComponent
  ],
  styleUrl: './draw-test.css'
})
export class DrawTest {

}
