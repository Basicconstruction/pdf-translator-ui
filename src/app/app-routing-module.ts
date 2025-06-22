import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pdf'
  },
  {
    path: 'pdf',
    loadChildren: () => import("./pdf-processing/pdf-module")
      .then(c => c.PdfModule),
  },
  {
    path: 'draw',
    loadChildren: () => import("./draw/draw.module")
      .then(m=>m.DrawModule)
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
