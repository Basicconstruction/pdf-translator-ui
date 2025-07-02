import {Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {Rectangle, ResizeHandle} from '../../models';
import {RectService} from '../../services';

@Component({
  selector: 'app-rect-shower',
  standalone: false,
  templateUrl: './rect-shower.html',
  styleUrl: './rect-shower.css'
})
export class RectShower {
  _rectangles: Rectangle[] = [];
  constructor() {

  }
  @Input("rectangles")
  set RectData(rectangles: Rectangle[]) {
    this._rectangles = rectangles;
  }

  get rectangles() {
    return this.getDynamicRectangles()
  }
  getDynamicRectangles(): Rectangle[] {
    const scaleX = this.viewWidth / this.canvasWidth;
    const scaleY = this.viewHeight / this.canvasHeight;

    return this._rectangles.map(rect => ({
      id: rect.id,
      x: rect.x * scaleX,
      y: rect.y * scaleY,
      width: rect.width * scaleX,
      height: rect.height * scaleY
    }));
  }
  @Input()
  canvasWidth: number = 900;
  @Input()
  canvasHeight: number = 900;
  @Input()
  viewWidth: number = 900;
  @Input()
  viewHeight: number = 900;

}
