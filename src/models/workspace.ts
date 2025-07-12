import {Rectangle} from './rectangle';

export interface Workspace{
  pdfIdentifier?: string;
  pageCount:number;
  canvasWidth: number;
  canvasHeight: number;
  pages: Rectangle[] [];
}
