import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'plane-position'
  },
  {
    path: 'pdf',
    loadChildren: () => import("../pdf-processing/pdf-module")
      .then(c => c.PdfModule),
  },
  {
    path: 'draw',
    loadChildren: () => import("../draw/draw.module")
      .then(m=>m.DrawModule)
  },
  {
    path: 'plane-position',
    loadChildren: () => import("../components/plane-position/plane-module")
      .then(m=>m.PlaneModule)
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
