import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RectService {

  constructor() {

  }
  handleLimits(mouseX: number, mouseY: number,mx:number,my: number,resizeHandle: string) {
    switch (resizeHandle) {
      case 'n':// north
        mouseY = Math.max(0, mouseY);
        break;
      case 'ne'://north east
        mouseX = Math.min(mx, mouseX);
        mouseY = Math.max(0, mouseY);
        break;
      case 'e'://east
        mouseX = Math.min(mx, mouseX);
        break;
      case 'se'://south east
        mouseX = Math.min(mx, mouseX);
        mouseY = Math.min(my, mouseY);
        break;
      case 's'://south
        mouseY = Math.min(my, mouseY);
        break;
      case 'sw'://south west
        mouseX = Math.max(0, mouseX);
        mouseY = Math.max(0, mouseY);
        break;
      case 'w'://west
        mouseX = Math.max(0, mouseX);
        break;
      case 'nw'://north west
        mouseX = Math.max(0, mouseX);
        mouseY = Math.max(0, mouseY);
        break;
    }
    return [mouseX, mouseY];
  }
}
