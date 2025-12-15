import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'beneficiario',
    loadChildren: () => import('./pages/beneficiario/beneficiario.routes').then(m => m.BENEFICIARIOS_ROUTES)
  }
];
