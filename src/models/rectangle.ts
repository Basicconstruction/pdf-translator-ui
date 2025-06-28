export interface Rectangle {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export type ResizeHandle = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw';
