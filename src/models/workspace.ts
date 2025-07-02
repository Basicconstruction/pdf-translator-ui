import {Rectangle} from './rectangle';

export interface Workspace{
  pageCount:number;
  canvasWidth: number;
  canvasHeight: number;
  pages: Rectangle[] [];
}
