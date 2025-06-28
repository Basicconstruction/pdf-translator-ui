import { Component } from '@angular/core';
import {PdfViewer} from '../pdf-viewer/pdf-viewer';

@Component({
  selector: 'app-pdf-view-test',
  standalone: true,
  imports: [
    PdfViewer
  ],
  templateUrl: './pdf-view-test.html',
  styleUrl: './pdf-view-test.css'
})
export class PdfViewTest {

}
