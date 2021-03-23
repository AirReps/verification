import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CertificateDisplayComponent } from './certificate-display/certificate-display.component';

const routes: Routes = [
  {
    path: 'search',
    component: CertificateDisplayComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'search'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
