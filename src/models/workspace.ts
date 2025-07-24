import {Rectangle} from './rectangle';
import {Dimension} from './dimension';

export interface Workspace{
  pdfIdentifier?: string;// pdf的简要标识
  pageCount:number;// pdf的页数
  dimensions:Dimension[];// pdf中的特殊的宽度和高度，page.index 指向该page对应的dimension
  pages: Page[];//pdf 每一个page的方框
}
export interface Page{
  index: number;
  rects: Rectangle[];
}
