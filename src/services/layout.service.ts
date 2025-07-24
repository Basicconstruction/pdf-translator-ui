import {Injectable} from '@angular/core';
import {Dimension} from '../models';

@Injectable({
  providedIn: 'root',
})
export class LayoutService{
  getLayout(dimension: Dimension[]): Dimension[] {
    let result: Dimension[] = [];
    for (let i = 0; i < dimension.length; i++) {
      let index2 = -1;
      for(let j = 0; j < result.length; j++) {
        if(this.dimensionEquals(dimension[i],result[j])){
          index2 = j;
          break;
        }
      }
      if(index2===-1){
        result.push(dimension[i]);
      }
    }
    return result;
  }
  dimensionEquals(dimension1: Dimension, dimension2: Dimension) {
    return dimension1.width=== dimension2.width && dimension1.height=== dimension2.height;
  }
}
