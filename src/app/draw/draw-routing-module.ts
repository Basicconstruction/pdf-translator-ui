import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'draw-test'
  },
  {
    path: 'draw-test',
    loadComponent: () => import("./draw-test/draw-test")
      .then(c => c.DrawTest),
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrawRoutingModule { }
