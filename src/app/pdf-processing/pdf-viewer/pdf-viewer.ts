import {Component, WritableSignal} from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NgxExtendedPdfViewerModule, pdfDefaultOptions} from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [
    NzCardModule,
    NgxExtendedPdfViewerModule
  ],
  templateUrl: './pdf-viewer.html',
  styleUrl: './pdf-viewer.css'
})
export class PdfViewer {
  pdfSrc: string | ArrayBuffer | Blob | Uint8Array | URL | {
    range: any;
  } | WritableSignal<string | ArrayBuffer | Blob | Uint8Array | URL | { range: any; }> = "";
  constructor() {
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
  }
}
