import {Component, ElementRef, ViewChild, WritableSignal} from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NgxExtendedPdfViewerModule, NgxExtendedPdfViewerService, pdfDefaultOptions} from 'ngx-extended-pdf-viewer';
import {NzInputNumberComponent} from 'ng-zorro-antd/input-number';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {FormsModule} from '@angular/forms';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {RectangleDrawerTestComponent} from '../../../test-components/rectangle-drawer/rectangle-drawer';
import {RectangleDrawerComponent} from '../../../components/rectangle-drawer/rectangle-drawer';

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
    RectangleDrawerTestComponent
  ],
  templateUrl: './pdf-viewer.html',
  styleUrl: './pdf-viewer.css'
})
export class PdfViewer {
  pdfSrc: string | ArrayBuffer | Blob | Uint8Array | URL | {
    range: any;
  } | WritableSignal<string | ArrayBuffer | Blob | Uint8Array | URL | { range: any; }> = "";
  spreadMode: "off" | "even" | "odd"  = "off";
  page: number = 1;
  zoom: string = 'page-fit';
  pageInput: number = 1;
  zoomInput: string = 'page-fit';
  width: number = 900;
  height: number = 900;
  constructor(private pdfViewerService: NgxExtendedPdfViewerService) {
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
  }
  @ViewChild('pdf_container',{read: ElementRef})
  elementRef: ElementRef | undefined;
  outRes: string = '';
  public async tackle(): Promise<void> {
    this.outRes = ''
    const rootEl: HTMLElement = this.elementRef!.nativeElement;
    const canvasEl: HTMLCanvasElement | null = rootEl.querySelector('canvas');

    if (canvasEl) {
      const rootRect = rootEl.getBoundingClientRect();
      const canvasRect = canvasEl.getBoundingClientRect();
      const offsetLeft = canvasRect.left - rootRect.left;
      const offsetTop = canvasRect.top - rootRect.top;

      this.outRes += 'canvas 相对于组件根元素的偏移:';
      this.outRes+=  `left: ${offsetLeft}, top: ${offsetTop}`;
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
}
