import {Component, ElementRef, ViewChild, WritableSignal} from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {
  NgxExtendedPdfViewerComponent,
  NgxExtendedPdfViewerModule,
  NgxExtendedPdfViewerService,
  pdfDefaultOptions
} from 'ngx-extended-pdf-viewer';
import {NzInputNumberComponent} from 'ng-zorro-antd/input-number';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {FormsModule} from '@angular/forms';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {RectangleDrawerComponent} from '../rectangle-drawer/rectangle-drawer';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {Bs64Handler} from '../../services';
import {Rectangle, Workspace} from '../../models';

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
  constructor(private bs64: Bs64Handler, private pdfService: NgxExtendedPdfViewerService) {
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
  }
  workspace: Workspace | undefined;
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
    this.storageToWorksapce(this.page-1)
    console.log(this.workspace)
    this.pdfViewerHeight = this.inputHeight;
    const rootEl: HTMLElement = this.pdfViewRef!.nativeElement;
    this.rectPainterHeight = rootEl.getBoundingClientRect().height;
    this.pdfViewerVisible = false;

    setTimeout(() => {
      this.pdfViewerVisible = true;
      this.pdfSrc = "";
      this.base64Src = this.pre64Src;
      console.log(this.workspace)
    },1)
  }
  inputWidthChange() {
    this.storageToWorksapce(this.page-1)
    this.pdfViewerVisible = false;
    this.pdfViewerWidth = this.inputWidth;
    this.rectPainterWidth = this.inputWidth;
    setTimeout(() => {
      this.pdfViewerVisible = true;
      this.pdfSrc = "";
      this.base64Src = this.pre64Src;
    },1)
  }
  pdfViewerWidth: number = 900;
  pdfViewerHeight: string = "900px";
  rectPainterWidth: number = 900;
  rectPainterHeight: number = 900;

  @ViewChild(NgxExtendedPdfViewerComponent,{read: ElementRef})
  ngxPdfViewer: NgxExtendedPdfViewerComponent | undefined;

  @ViewChild("pdf_container",{read: ElementRef})
  pdfViewRef: ElementRef | undefined;
  @ViewChild(RectangleDrawerComponent)
  rectangleDrawer: RectangleDrawerComponent | undefined;
  outRes: string = '';
  offsetLeft: number = 0;
  offsetTop: number = 0;
  onPdfLoad(){
    this.tackle();
    this.rectPainterWidth = this.cWidth;
    this.rectPainterHeight = this.cHeight;
    if(this.workspace?.pdfIdentifier!==this.identifier){
      let count = this.pdfService.numberOfPages();
      this.workspace = {
        pageCount: count,
        canvasWidth: this.cWidth,//base
        canvasHeight: this.cHeight,//base
        pages: this.fillRects(count),
        pdfIdentifier: this.identifier
      }
    }
    this.rectVisible = true;

    setTimeout(() => {
      this.loadFromWorkspace(this.page-1)
    },100)
  }
  fillRects(count: number) {
    let result: Rectangle[][] = [];
    for(let i = 0; i < count; i++) {
      let rect: Rectangle[] = [];
      result.push(rect);
    }
    return result;
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
    reader.onload = async () => {
       this.preSrc = reader.result as ArrayBuffer | Blob;
       this.pre64Src = this.bs64.arrayBufferToBase64(reader.result as ArrayBuffer);
       this.pdfSrc = this.preSrc;
       this.identifier = await this.bs64.hashStringSHA256(this.pre64Src);
    };
    reader.readAsArrayBuffer(file);
  }
  identifier: string|undefined = undefined;
  preSrc: ArrayBuffer | Blob | undefined;
  pre64Src: string | undefined;
  availableHeights: string[] = [
    'auto','900px','1000px','1100px','1200px','1300px','1400px','1500px','1600px','1700px','1800px','1900px','2000px',
  ]
  inputWidth: number = 900;
  availableWidths: number[] = [
    900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300
  ]
  storageToWorksapce(stoIndex: number){
    if(!this.workspace) {
      return;
    }
    this.workspace.pages[stoIndex] = this.rectangleDrawer!.exportRectangles(this.workspace);

    // console.log(`存入 ${stoIndex}`);
    // console.log(this.workspace.pages[stoIndex]);
    // console.log(this.workspace)

  }
  loadFromWorkspace(loadIndex: number){
    // let rects = this.workspace!.pages[loadIndex];
    console.log(`拿出 ${loadIndex}`);
    // console.log(this.workspace)
    // console.log(rects)
    this.rectangleDrawer?.importRectangles(this.workspace!,loadIndex);
  }

  lastPage() {
    if(!this.page) return;
    this.storageToWorksapce(this.page-1);
    if(this.page===1) return;
    this.loadFromWorkspace(this.page-2);
    this.page--;
  }

  nextPage() {
    if(!this.page) return;
    this.storageToWorksapce(this.page-1);
    if(this.page>=this.workspace!.pageCount){
      return;
    }
    this.loadFromWorkspace(this.page);
    this.page++;
  }

  nextAvailable() {
    if(this.workspace) {
      return this.page>=this.workspace!.pageCount
    }
    return true;
  }
}
