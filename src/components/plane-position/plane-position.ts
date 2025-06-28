import {Component, ElementRef, ViewChild, WritableSignal} from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NgxExtendedPdfViewerComponent, NgxExtendedPdfViewerModule, pdfDefaultOptions} from 'ngx-extended-pdf-viewer';
import {NzInputNumberComponent} from 'ng-zorro-antd/input-number';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {FormsModule} from '@angular/forms';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {RectangleDrawerComponent} from '../rectangle-drawer/rectangle-drawer';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {Bs64Handler} from '../../services';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [
    NzCardModule,
    NgxExtendedPdfViewerModule,
    NzInputNumberComponent,
    NzButtonComponent,
    FormsModule,
    NzInputDirective,
    RectangleDrawerComponent,
    NzSelectModule,
    FormsModule,
  ],
  templateUrl: './plane-position.html',
  styleUrl: './plane-position.css'
})
export class PlanePosition {
  pdfSrc: string | ArrayBuffer | Blob | Uint8Array | URL | {
    range: any;
  } | WritableSignal<string | ArrayBuffer | Blob | Uint8Array | URL | { range: any; }> = "";
  base64Src: string | undefined;
  spreadMode: "off" | "even" | "odd"  = "off";
  page: number = 1;
  zoom: string = 'page-fit';
  pageInput: number = 1;
  zoomInput: string = 'page-fit';
  inputHeight: string = "900px";
  inputHeightChange() {
    this.pdfViewerVisible = false;
    this.pdfViewerHeight = this.inputHeight;
    this.rectPainterHeight = this.pdfViewerHeight;
    setTimeout(() => {
      this.pdfViewerVisible = true;
      this.pdfSrc = "";
      this.base64Src = this.pre64Src;
    },100)
  }
  inputWidthChange() {
    this.pdfViewerVisible = false;
    this.pdfViewerWidth = this.inputWidth;
    this.rectPainterWidth = this.inputWidth;
    setTimeout(() => {
      this.pdfViewerVisible = true;
      this.pdfSrc = "";
      this.base64Src = this.pre64Src;
    },100)
  }
  pdfViewerWidth: string = "900px";
  pdfViewerHeight: string = "900px";
  rectPainterWidth: string = "900px";
  rectPainterHeight: string = "900px";
  constructor(private bs64: Bs64Handler) {
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
  }
  @ViewChild(NgxExtendedPdfViewerComponent,{read: ElementRef})
  ngxPdfViewer: NgxExtendedPdfViewerComponent | undefined;

  @ViewChild("pdf_container",{read: ElementRef})
  pdfViewRef: ElementRef | undefined;
  @ViewChild(RectangleDrawerComponent, {read: ElementRef})
  rectangleDrawer: RectangleDrawerComponent | undefined;
  outRes: string = '';
  offsetLeft: number = 0;
  offsetTop: number = 0;
  onPdfLoad(){
    this.tackle();
    this.rectPainterWidth = `${this.cWidth}px`;
    this.rectPainterHeight = `${this.cHeight}px`;
    setTimeout(() => {
      this.rectVisible = true;

    },100)
  }
  cWidth: number = 0;
  cHeight: number = 0;
  rectVisible: boolean = true;
  pdfViewerVisible: boolean = true;
  tackle(){
    this.outRes = ''
    const rootEl: HTMLElement = this.pdfViewRef!.nativeElement;
    const canvasEl: HTMLCanvasElement | null = rootEl.querySelector('canvas');

    if (canvasEl) {
      const rootRect = rootEl.getBoundingClientRect();
      const canvasRect = canvasEl.getBoundingClientRect();
      const offsetLeft = canvasRect.left - rootRect.left;
      const offsetTop = canvasRect.top - rootRect.top;

      this.outRes += 'canvas 相对于组件根元素的偏移:';
      this.outRes+=  `left: ${offsetLeft}, top: ${offsetTop}`;
      this.offsetLeft = offsetLeft;
      this.offsetTop = offsetTop;
      this.cWidth = canvasRect.width;
      this.cHeight = canvasRect.height;
      this.rectVisible = false;
    } else {
      this.outRes += '未找到 canvas 元素';
    }
  }
  scrollTo(){
    this.page = this.pageInput;
  }
  zoomTo(){
    this.zoom = this.zoomInput;
  }

  setPdfFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      console.log('未选择文件');
      return;
    }

    const file = input.files[0];
    console.log('选择的文件名:', file.name);

    // 例如读取文件内容
    const reader = new FileReader();
    reader.onload = () => {
       this.preSrc = reader.result as ArrayBuffer | Blob;
       this.pre64Src = this.bs64.arrayBufferToBase64(reader.result as ArrayBuffer);
       this.pdfSrc = this.preSrc;
    };
    reader.readAsArrayBuffer(file);
  }
  preSrc: ArrayBuffer | Blob | undefined;
  pre64Src: string | undefined;
  availableHeights: string[] = [
    'auto','900px','1000px','1100px','1200px','1300px','1400px','1500px','1600px','1700px','1800px','1900px','2000px',
  ]
  inputWidth: string = "900px";
  availableWidths: string[] = [
    'auto','900px','1000px','1100px','1200px','1300px','1400px','1500px','1600px','1700px','1800px','1900px','2000px','2100px','2200px','2300px','2400px',
  ]

}
