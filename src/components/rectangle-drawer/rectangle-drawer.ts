import {Component, ElementRef, HostListener, Input, SimpleChanges, ViewChild} from '@angular/core';
import {Rectangle, ResizeHandle, Workspace} from '../../models';
import {RectService} from '../../services';

@Component({
  selector: 'app-rectangle-drawer',
  templateUrl: './rectangle-drawer.html',
  imports: [
  ],
  styleUrls: ['./rectangle-drawer.css']
})
export class RectangleDrawerComponent {

  rectangles: Rectangle[] = [];
  selectedRectId: number | null = null;
  constructor(private rectService: RectService) {

  }

  @Input()
  width: number = 900;
  @Input()
  height: number = 900;

  private drawing = false;
  private startX = 0;
  private startY = 0;

  private resizing = false;
  private resizeRect: Rectangle | null = null;
  private resizeHandle: ResizeHandle | null = null;

  private moving = false;
  private moveStartX = 0;
  private moveStartY = 0;
  private moveRectStartX = 0;
  private moveRectStartY = 0;
  public viewMouseX = 0;
  public viewMouseY = 0;
  resizeHandles: ResizeHandle[] = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
  @ViewChild('parent',{read: ElementRef})
  _pa: ElementRef | undefined;
  // 鼠标按下开始绘制矩形
  startDrawing(event: MouseEvent) {
    if (this.selectedRectId !== null){
      this.selectedRectId = null;
      return;
    }// 选中状态下不绘制新矩形
    this.drawing = true;
    this.startX = event.clientX - this._b.left;// 起始点
    this.startY = event.clientY - this._b.top;
  }
  get _b(){
    return this._pa?.nativeElement.getBoundingClientRect();
  }
  get _pe(){
    return this._pa!.nativeElement as HTMLElement
  }
  pageIndex: number | undefined = 0;
  importRectangles(workspace: Workspace,index:number){
    this.pageIndex = index;
    let dimension = workspace.dimensions[workspace.pages[this.pageIndex!].index];
    let xrate = this.width / dimension.width;
    let yrate = this.height / dimension.height;
    this.rectangles = workspace.pages[index].rects.map(rect => ({
      id: rect.id,
      x: rect.x * xrate,
      y: rect.y  * yrate,
      width: rect.width * xrate,
      height: rect.height  * yrate,
    }));
  }
  exportRectangles(workspace: Workspace): Rectangle[] {
    let dimension = workspace.dimensions[workspace.pages[this.pageIndex!].index];
    let xrate = this.width / dimension.width;
    let yrate = this.height / dimension.height;
    return this.rectangles.map(rect => ({
      id: rect.id,
      x: rect.x / xrate,
      y: rect.y / yrate,
      width: rect.width / xrate,
      height: rect.height / yrate,
    }))
  }
  // 鼠标移动更新矩形大小
  drawingRect(event: MouseEvent) {
    if (!this.drawing){
      return;
    }
    const currentX = event.clientX - this._b.left;// 移动过程中的矩形终点x
    const currentY = event.clientY - this._b.top;
    let x = Math.min(this.startX, currentX);// 较小的x作为实际举行的x
    let y = Math.min(this.startY, currentY);
    let width = Math.abs(currentX - this.startX);
    let height = Math.abs(currentY - this.startY);

    // 临时绘制一个矩形（放在最后）
    let tmpRect: Rectangle = {
      id: -1,
      x, y,
      width,
      height };
    if (this.rectangles.length && this.rectangles[this.rectangles.length - 1].id === -1) {
      this.rectangles[this.rectangles.length - 1] = tmpRect;
    } else {
      this.rectangles.push(tmpRect);
    }
  }

  // 鼠标松开结束绘制
  endDrawing(event: MouseEvent) {
    if (!this.drawing) return;
    this.drawing = false;

    // 移除临时矩形
    const tempIndex = this.rectangles.findIndex(r => r.id === -1);
    if (tempIndex === -1) return;

    const tempRect = this.rectangles[tempIndex];
    if (tempRect.width < 5 || tempRect.height < 5) {
      // 太小不保存
      this.rectangles.splice(tempIndex, 1);
      return;
    }

    // 赋予正式id
    const newRect: Rectangle = {
      id: this.generateId(),
      x: tempRect.x,
      y: tempRect.y,
      width: tempRect.width,
      height: tempRect.height
    };

    this.rectangles.splice(tempIndex, 1, newRect);
  }

  // 生成唯一id
  private generateId(): number {
    return this.rectangles.length ? Math.max(...this.rectangles.map(r => r.id)) + 1 : 1;
  }

  // 选中矩形
  selectRectangle(event: MouseEvent, rect: Rectangle) {
    event.stopPropagation(); // 防止触发绘制
    this.selectedRectId = rect.id;

    // 开始移动矩形
    this.moving = true;
    this.moveStartX = event.clientX;
    this.moveStartY = event.clientY;
    this.moveRectStartX = rect.x;
    this.moveRectStartY = rect.y;
  }
  // 监听全局鼠标移动处理移动和缩放
  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.moving && this.selectedRectId !== null) {
      const dx = event.clientX - this.moveStartX;
      const dy = event.clientY - this.moveStartY;

      const rect = this.rectangles.find(r => r.id === this.selectedRectId);
      if (!rect) return;

      rect.x = this.moveRectStartX + dx;
      rect.y = this.moveRectStartY + dy;
      if(rect.width>=this._pe.clientWidth ){
        rect.width = this._pe.clientWidth;
      }
      if(rect.height>=this._pe.clientHeight ){
        rect.height = this._pe.clientHeight;
      }
      // 限制不能移出绘图区（假设绘图区左上角是0,0）
      rect.x = Math.max(0, rect.x);
      rect.y = Math.max(0, rect.y);
      if(rect.x>= this._pe.offsetWidth-rect.width){
        rect.x = this._pe.offsetWidth-rect.width;
      }
      if(rect.y >= this._pe.offsetHeight-rect.height){
        rect.y = this._pe.offsetHeight - rect.height;
      }
    }

    if (this.resizing && this.resizeRect && this.resizeHandle) {
      this.resizeRectangle(event);
    }
  }

  // 监听全局鼠标松开结束移动和缩放
  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.moving = false;
    this.resizing = false;
    this.resizeRect = null;
    this.resizeHandle = null;
  }

  // 开始调整大小
  startResizing(event: MouseEvent, rect: Rectangle, handle: ResizeHandle) {
    event.stopPropagation();
    this.resizing = true;
    this.resizeRect = rect;
    this.resizeHandle = handle;
  }
  private miniX: number = 5;
  private miniY: number = 5;
  // 根据handle调整矩形大小
  private resizeRectangle(event: MouseEvent) {
    if (!this.resizeRect || !this.resizeHandle) return;
    let _b = this._pa?.nativeElement.getBoundingClientRect();
    const rect = this.resizeRect;
    let mouseX = event.clientX - _b.left;
    let mouseY = event.clientY - _b.top;
    let mx = this._pe.offsetWidth;
    let my = this._pe.offsetHeight;

    if(mouseX>=mx){
      mouseX = Math.min(mouseX, mx);
    }
    if(mouseY>=my){
      mouseY = Math.min(mouseY, my);
    }
    if(mouseX<=0){
      mouseX = Math.max(mouseX, 0);
    }
    if(mouseY<=0){
      mouseY = Math.max(mouseY, 0);
    }
    let handleResult = this.rectService.handleLimits(mouseX, mouseY,mx,my,this.resizeHandle);
    mouseX = handleResult[0];// 优化输入
    mouseY = handleResult[1];
    this.viewMouseX = mouseX;
    this.viewMouseY = mouseY;

    let x = rect.x;
    let y = rect.y;
    let w = rect.width;
    let h = rect.height;

    switch (this.resizeHandle) {
      case 'n':// north
        h += y - mouseY;
        y = mouseY;
        break;
      case 'ne'://north east
        w = mouseX - x;
        h += y - mouseY;
        y = mouseY;
        break;
      case 'e'://east
        w = mouseX - x;
        break;
      case 'se'://south east
        w = mouseX - x;
        h = mouseY - y;
        break;
      case 's'://south
        h = mouseY - y;
        break;
      case 'sw'://south west
        w += x - mouseX;
        x = mouseX;
        h = mouseY - y;
        break;
      case 'w'://west
        w += x - mouseX;
        x = mouseX;
        break;
      case 'nw'://north west
        w += x - mouseX;
        x = mouseX;
        h += y - mouseY;
        y = mouseY;
        break;
    }

    // 限制最小宽高
    if (w < this.miniX) w = this.miniX;
    if (h < this.miniY) h = this.miniY;

    // 限制不能超出绘图区
    if (x < 0) x = 0;
    if (y < 0) y = 0;

    if(x>= mx-w){
      x = mx-w;
    }
    if(y >= my-h){
      y =my - h;
    }

    rect.x = x;
    rect.y = y;
    rect.width = w;
    rect.height = h;

  }
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Delete') {
      if(this.selectedRectId !== null) {
        let index = this.rectangles.findIndex(r => r.id === this.selectedRectId);
        this.rectangles.splice(index, 1);
      }
    }
  }
}
